using System;
using System.Web.Mvc;
using Realtors_Portal.Modules.Payment;
using Realtors_Portal.Modules.Payment.Models;
using Realtors_Portal.Modules.Payment.Services;

namespace Realtors_Portal.Modules.Payment.Controllers
{
    public class PaymentController : Controller
    {
        private readonly IPaymentService _paymentService;

        public PaymentController()
        {
            var membership = new MembershipPaymentService();
            var listing = new ListingPaymentService();
            _paymentService = new PaymentService(membership, listing);
        }

        public ActionResult Index()
            => Content($"Payment module is alive. DefaultCurrency={PaymentConfig.DefaultCurrencyCode}");

        [HttpPost]
        public ActionResult CreateMembership(string plan, string currency = null, string gateway = null, string customerId = null, string orderId = null)
        {
            var planTier = ParsePlan(plan);
            var absBase = $"{Request.Url.Scheme}://{Request.Url.Authority}";
            var returnUrl = absBase + Url.Content($"~/{PaymentConfig.ReturnBasePath}/vnpay");
            var cancelUrl = absBase + Url.Content($"~/{PaymentConfig.CancelBasePath}/vnpay");
            var webhookUrl = absBase + Url.Content($"~/{PaymentConfig.WebhookBasePath}/vnpay");

            var req = new CreatePaymentRequest
            {
                Purpose = PaymentPurpose.Membership,
                Plan = planTier,
                CurrencyCode = currency,
                Gateway = string.IsNullOrWhiteSpace(gateway) ? "vnpay" : gateway,
                CustomerId = customerId,
                OrderId = orderId,
                ReturnUrl = returnUrl,
                CancelUrl = cancelUrl,
                WebhookUrl = webhookUrl
            };
            var result = _paymentService.CreatePayment(req);
            return Json(result);
        }

        [HttpPost]
        public ActionResult CreateListing(int listingCount, string currency = null, string gateway = null, string customerId = null, string orderId = null)
        {
            var absBase = $"{Request.Url.Scheme}://{Request.Url.Authority}";
            var returnUrl = absBase + Url.Content($"~/{PaymentConfig.ReturnBasePath}/vnpay");
            var cancelUrl = absBase + Url.Content($"~/{PaymentConfig.CancelBasePath}/vnpay");
            var webhookUrl = absBase + Url.Content($"~/{PaymentConfig.WebhookBasePath}/vnpay");

            var req = new CreatePaymentRequest
            {
                Purpose = PaymentPurpose.Listing,
                ListingCount = listingCount,
                CurrencyCode = currency,
                Gateway = string.IsNullOrWhiteSpace(gateway) ? "vnpay" : gateway,
                CustomerId = customerId,
                OrderId = orderId,
                ReturnUrl = returnUrl,
                CancelUrl = cancelUrl,
                WebhookUrl = webhookUrl
            };
            var result = _paymentService.CreatePayment(req);
            return Json(result);
        }

        [HttpGet]
        public ActionResult Return(string gateway, string orderId = null, string txnId = null)
        {
            // VNPAY trả về bằng query; cần chuyển nguyên xi vào Verify để ký lại.
            var raw = Request?.Url?.Query ?? "";
            var vnpOrderId = Request["vnp_TxnRef"];
            var sig = Request["vnp_SecureHash"];
            var verify = _paymentService.Verify(
                gateway: string.IsNullOrWhiteSpace(gateway) ? "vnpay" : gateway,
                orderId: vnpOrderId ?? orderId,
                rawPayload: raw,
                signature: sig);

            return Content($"[Return] {verify.Status} gateway={gateway ?? "vnpay"}, orderId={vnpOrderId ?? orderId}, txn={verify.TransactionId}");
        }

        [HttpGet]
        public ActionResult Cancel(string gateway, string orderId = null)
        {
            return Content($"[Cancel] gateway={gateway}, orderId={orderId}");
        }

        private static PlanTier ParsePlan(string plan)
        {
            if (string.IsNullOrWhiteSpace(plan)) throw new ArgumentException("Thiếu plan (dong/vang/kimcuong).");
            var p = plan.Trim().ToLowerInvariant();
            if (p == "dong" || p == "đồng") return PlanTier.Dong;
            if (p == "vang" || p == "vàng") return PlanTier.Vang;
            if (p == "kimcuong" || p == "kim cương") return PlanTier.KimCuong;
            throw new ArgumentException("Plan không hợp lệ (dong/vang/kimcuong).");
        }

        // GET /Payment/VnPay?purpose=membership&plan=vang&currency=VND&customerId=123&orderId=abc
        // GET /Payment/VnPay?purpose=listing&listingCount=2&currency=VND
        [HttpGet]
        public ActionResult VnPay(string purpose = "membership", string plan = "vang", int? listingCount = null,
                                  string currency = null, string customerId = null, string orderId = null)
        {
            var absBase = $"{Request.Url.Scheme}://{Request.Url.Authority}";
            ViewBag.ReturnUrl = absBase + Url.Content($"~/{PaymentConfig.ReturnBasePath}/vnpay");
            ViewBag.WebhookUrl = absBase + Url.Content($"~/{PaymentConfig.WebhookBasePath}/vnpay");

            ViewBag.Purpose = (purpose ?? "membership").ToLowerInvariant();
            ViewBag.Plan = plan;
            ViewBag.ListingCount = listingCount;
            ViewBag.Currency = currency;
            ViewBag.CustomerId = customerId;
            ViewBag.OrderId = orderId;

            return View();
        }


        //TEST
        [HttpGet]
        public ActionResult Test()
        {
            var absBase = $"{Request.Url.Scheme}://{Request.Url.Authority}";
            ViewBag.ReturnUrl = absBase + Url.Content($"~/{PaymentConfig.ReturnBasePath}/vnpay");
            ViewBag.WebhookUrl = absBase + Url.Content($"~/{PaymentConfig.WebhookBasePath}/vnpay");
            return View();
        }
    }
}