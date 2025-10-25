using System;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Realtors_Portal.Models;
using Realtors_Portal.Modules.Payment.Models;
using Realtors_Portal.Modules.Payment.VnPay;

using DbContract = Realtors_Portal.Models.Contract;
using DbPayment = Realtors_Portal.Models.Payment;
using DbPaymentTxn = Realtors_Portal.Models.PaymentTransaction;
using DbPaymentLog = Realtors_Portal.Models.PaymentLog;

namespace Realtors_Portal.Modules.Payment.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IMembershipPaymentService _membership;
        private readonly IListingPaymentService _listing;
        private readonly ICurrencyService _currency;

        public PaymentService(
            IMembershipPaymentService membership,
            IListingPaymentService listing,
            ICurrencyService currency = null)
        {
            _membership = membership ?? throw new ArgumentNullException(nameof(membership));
            _listing = listing ?? throw new ArgumentNullException(nameof(listing));
            _currency = currency ?? new CurrencyService();
        }

        public decimal CalculateAmount(CreatePaymentRequest req)
        {
            var baseCurrency = PaymentConfig.DefaultCurrencyCode; // VND
            var reqCurrency = string.IsNullOrWhiteSpace(req.CurrencyCode)
                ? baseCurrency
                : req.CurrencyCode.Trim().ToUpperInvariant();

            decimal baseAmount; // theo VND
            switch (req.Purpose)
            {
                case PaymentPurpose.Membership:
                    if (req.Plan == null) throw new ArgumentException("Thiếu Plan cho Membership.");
                    baseAmount = _membership.GetPlanPrice(req.Plan.Value, baseCurrency);
                    break;
                case PaymentPurpose.Listing:
                    if (req.ListingCount == null || req.ListingCount <= 0)
                        throw new ArgumentException("Thiếu ListingCount cho Listing.");
                    baseAmount = _listing.GetListingPrice(req.ListingCount.Value, null, baseCurrency);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(req.Purpose));
            }

            if (reqCurrency == baseCurrency) return baseAmount;

            var rate = _currency.GetExchangeRate(reqCurrency);
            if (rate <= 0) rate = 1m;

            var amountReq = decimal.Round(baseAmount / rate, 2, MidpointRounding.AwayFromZero);
            return amountReq;
        }

        public PaymentInitResult CreatePayment(CreatePaymentRequest req)
        {
            var baseCurrency = PaymentConfig.DefaultCurrencyCode; // VND
            var currencyCode = string.IsNullOrWhiteSpace(req.CurrencyCode)
                ? baseCurrency
                : req.CurrencyCode.Trim().ToUpperInvariant();
            var amount = CalculateAmount(req);

            var orderId = string.IsNullOrWhiteSpace(req.OrderId)
                ? Guid.NewGuid().ToString("N")
                : req.OrderId;
            var gateway = string.IsNullOrWhiteSpace(req.Gateway)
                ? "vnpay"
                : req.Gateway.Trim().ToLowerInvariant();

            var returnUrl = string.IsNullOrWhiteSpace(req.ReturnUrl) ? MakeAbsolute($"/{PaymentConfig.ReturnBasePath}/{gateway}") : req.ReturnUrl;
            var cancelUrl = string.IsNullOrWhiteSpace(req.CancelUrl) ? MakeAbsolute($"/{PaymentConfig.CancelBasePath}/{gateway}") : req.CancelUrl;
            var webhookUrl = string.IsNullOrWhiteSpace(req.WebhookUrl) ? MakeAbsolute($"/{PaymentConfig.WebhookBasePath}/{gateway}") : req.WebhookUrl;

            using (var db = new RealtorsPortalEntities())
            {
                var contractId = EnsureContractForOrder(db, req, orderId);

                var meta = new PaymentMeta
                {
                    Purpose = req.Purpose,
                    Plan = req.Plan,
                    ListingCount = req.ListingCount,
                    CustomerId = req.CustomerId,
                    Currency = currencyCode,
                    Gateway = gateway
                };
                var metaJson = JsonConvert.SerializeObject(meta);

                var payment = new DbPayment
                {
                    ContractID = contractId,
                    Amount = amount,
                    PaymentMethod = gateway,
                    PaymentDate = DateTime.UtcNow,
                    TransactionCode = orderId,     // ★ orderId
                    ExternalTransactionId = null,
                    CurrencyCode = currencyCode,
                    Status = "Pending",
                    Description = metaJson,
                    UpdatedAt = DateTime.UtcNow
                };
                db.Payments.Add(payment);
                db.SaveChanges();

                db.PaymentTransactions.Add(new DbPaymentTxn
                {
                    PaymentId = payment.PaymentID,
                    ActionType = "INIT",
                    ResponseCode = "PENDING",
                    ResponseMessage = $"Init orderId={orderId}; return={returnUrl}; cancel={cancelUrl}; webhook={webhookUrl}",
                    RawResponse = null,
                    CreatedAt = DateTime.UtcNow
                });
                db.SaveChanges();

                string checkoutUrl;
                if (gateway == "vnpay")
                {
                    // Vì sao: VNPAY chỉ nhận VND; nếu người dùng chọn ngoại tệ → đổi sang VND để gửi vnp_Amount.
                    var amountVnd = currencyCode == baseCurrency
                        ? decimal.ToInt64(decimal.Round(amount, 0, MidpointRounding.AwayFromZero))
                        : decimal.ToInt64(decimal.Round(amount * _currency.GetExchangeRate(currencyCode), 0, MidpointRounding.AwayFromZero));

                    var settings = VnPaySettings.LoadFromConfig();
                    var ip = TryGetClientIp();
                    var orderInfo = BuildOrderInfo(meta, orderId);

                    checkoutUrl = VnPayHelper.BuildPaymentUrl(
                        cfg: settings,
                        orderId: orderId,
                        amountVnd: amountVnd,
                        ipAddr: ip,
                        orderInfo: orderInfo,
                        returnUrlAbsolute: returnUrl,
                        bankCode: null,
                        locale: "vn",
                        expireUtc: DateTime.UtcNow.AddMinutes(settings.TimeoutMinutes));
                }
                else
                {
                    // fallback/mock
                    checkoutUrl = returnUrl + "&mock=1";
                }

                return new PaymentInitResult
                {
                    Ok = true,
                    OrderId = orderId,
                    Gateway = gateway,
                    Currency = currencyCode,
                    Amount = amount,
                    CheckoutUrl = checkoutUrl,
                    Status = PaymentStatus.Pending,
                    Message = gateway == "vnpay" ? "Created & signed VNPAY checkout URL." : "Created (mock)."
                };
            }
        }

        public VerifyResult Verify(string gateway, string orderId, string rawPayload, string signature = null)
        {
            gateway = (gateway ?? "unknown").ToLowerInvariant();

            if (gateway == "vnpay")
            {
                var settings = VnPaySettings.LoadFromConfig();
                var ok = VnPayHelper.ValidateSignature(rawPayload, settings.HashSecret, out var kv);

                var verify = new VerifyResult
                {
                    Ok = ok,
                    OrderId = kv.TryGetValue("vnp_TxnRef", out var oid) ? oid : orderId,
                    Gateway = "vnpay",
                    Status = PaymentStatus.Failed,
                    TransactionId = kv.TryGetValue("vnp_TransactionNo", out var tno) ? tno : null,
                    PaidAmount = TryGetPaid(kv),
                    PaidCurrency = "VND",
                    RawPayload = rawPayload,
                    Message = ok ? "VNPAY signature valid." : "Invalid VNPAY signature."
                };

                if (ok)
                {
                    var resp = kv.TryGetValue("vnp_ResponseCode", out var rc) ? rc : null;
                    var txn = kv.TryGetValue("vnp_TransactionStatus", out var ts) ? ts : null;
                    if (resp == "00" && txn == "00")
                        verify.Status = PaymentStatus.Succeeded;
                    else if (resp == "24") // cancelled by user
                        verify.Status = PaymentStatus.Canceled;
                    else
                        verify.Status = PaymentStatus.Failed;
                }

                ApplyVerifyToDb(verify);
                return verify;
            }

            // Gateway khác (mock)
            var mock = new VerifyResult
            {
                Ok = true,
                OrderId = orderId,
                Gateway = gateway,
                Status = PaymentStatus.Succeeded,
                TransactionId = "mock-txn",
                PaidAmount = null,
                PaidCurrency = PaymentConfig.DefaultCurrencyCode,
                RawPayload = rawPayload,
                Message = "Verified (mock)"
            };
            ApplyVerifyToDb(mock);
            return mock;
        }

        private void ApplyVerifyToDb(VerifyResult verify)
        {
            using (var db = new RealtorsPortalEntities())
            {
                var payment = db.Payments.SingleOrDefault(p => p.TransactionCode == verify.OrderId);
                if (payment == null)
                {
                    db.PaymentLogs.Add(new DbPaymentLog
                    {
                        PaymentId = null,
                        LogType = "VERIFY_MISSING",
                        Message = $"orderId={verify.OrderId}, gateway={verify.Gateway}, not found",
                        CreatedAt = DateTime.UtcNow
                    });
                    db.SaveChanges();
                    return;
                }

                if (string.Equals(payment.Status, "Succeeded", StringComparison.OrdinalIgnoreCase))
                    return; // idempotent

                payment.Status = (verify.Status == PaymentStatus.Succeeded) ? "Succeeded"
                               : (verify.Status == PaymentStatus.Canceled) ? "Canceled"
                               : (verify.Status == PaymentStatus.Failed) ? "Failed"
                               : "Pending";
                payment.ExternalTransactionId = verify.TransactionId;
                payment.UpdatedAt = DateTime.UtcNow;

                db.PaymentTransactions.Add(new DbPaymentTxn
                {
                    PaymentId = payment.PaymentID,
                    ActionType = "VERIFY",
                    ResponseCode = verify.Status.ToString().ToUpperInvariant(),
                    ResponseMessage = verify.Message,
                    RawResponse = verify.RawPayload,
                    CreatedAt = DateTime.UtcNow
                });

                var contract = db.Contracts.FirstOrDefault(c => c.ContractID == payment.ContractID);
                var customerIdStr = contract != null ? contract.CustomerID.ToString() : null;

                PaymentMeta meta = null;
                try { meta = JsonConvert.DeserializeObject<PaymentMeta>(payment.Description ?? ""); } catch { /* ignore */ }

                if (verify.Ok && verify.Status == PaymentStatus.Succeeded && meta != null)
                {
                    if (meta.Purpose == PaymentPurpose.Membership && meta.Plan.HasValue)
                        _membership.ApplyMembership(customerIdStr, meta.Plan.Value, verify);
                    else if (meta.Purpose == PaymentPurpose.Listing && meta.ListingCount.HasValue)
                        _listing.AddListingQuota(customerIdStr, meta.ListingCount.Value, verify);
                }

                db.SaveChanges();
            }
        }

        private static string BuildOrderInfo(PaymentMeta meta, string orderId)
        {
           
            if (meta == null) return $"Order {orderId}";
            if (meta.Purpose == PaymentPurpose.Membership && meta.Plan.HasValue)
                return $"Membership {meta.Plan.Value} - {orderId}";
            if (meta.Purpose == PaymentPurpose.Listing && meta.ListingCount.HasValue)
                return $"Buy {meta.ListingCount.Value} listing(s) - {orderId}";
            return $"Order {orderId}";
        }

        private static decimal? TryGetPaid(System.Collections.Generic.Dictionary<string, string> kv)
        {
            if (kv.TryGetValue("vnp_Amount", out var s) && long.TryParse(s, out var v))
                return v / 100m; // vnp_Amount x100
            return null;
        }

        private static string TryGetClientIp()
        {
            try
            {
                var req = HttpContext.Current?.Request;
                var ip = req?.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (!string.IsNullOrWhiteSpace(ip)) return ip.Split(',')[0].Trim();
                return req?.UserHostAddress ?? "127.0.0.1";
            }
            catch { return "127.0.0.1"; }
        }

        private string MakeAbsolute(string relative)
        {
            try
            {
                var ctx = HttpContext.Current;
                if (ctx?.Request?.Url == null) return relative;
                var uri = new Uri(ctx.Request.Url, VirtualPathUtility.ToAbsolute("~" + relative.TrimStart('~')));
                return uri.ToString();
            }
            catch { return relative; }
        }

        private int EnsureContractForOrder(RealtorsPortalEntities db, CreatePaymentRequest req, string orderId)
        {
            var packageId = ResolvePackageIdForPlan(db, req.Plan);
            var contract = new DbContract
            {
                CustomerID = TryParseInt(req.CustomerId) ?? 0,
                PackageID = packageId,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(30)
            };
            db.Contracts.Add(contract);
            db.SaveChanges();
            return contract.ContractID;
        }

        private int ResolvePackageIdForPlan(RealtorsPortalEntities db, PlanTier? plan)
        {
            var q = db.Packages.Where(p => p.PackageType == "Agent" && p.IsActive == true);

            if (plan.HasValue)
            {
                var name = plan.Value == PlanTier.Dong ? "đồng"
                         : plan.Value == PlanTier.Vang ? "vàng"
                         : "kim cương";
                var pkg = q.FirstOrDefault(p => p.PackageName != null &&
                                                p.PackageName.ToLower().Contains(name));
                if (pkg != null) return pkg.PackageID;
            }

            var any = q.FirstOrDefault();
            if (any != null) return any.PackageID;

            var first = db.Packages.FirstOrDefault();
            if (first != null) return first.PackageID;

            throw new InvalidOperationException("Không tìm thấy Package phù hợp cho Contract.");
        }

        private int? TryParseInt(string s)
        {
            if (string.IsNullOrWhiteSpace(s)) return null;
            if (int.TryParse(s, out var v)) return v;
            return null;
        }
    }
}