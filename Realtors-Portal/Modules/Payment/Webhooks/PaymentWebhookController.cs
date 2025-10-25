using System;
using System.IO;
using System.Text;
using System.Web.Mvc;
using Realtors_Portal.Modules.Payment.Models;
using Realtors_Portal.Modules.Payment.Services;
using Realtors_Portal.Modules.Payment.VnPay;

namespace Realtors_Portal.Modules.Payment.Webhooks
{
    /// Nhận webhook/IPN từ cổng thanh toán: /webhooks/payment/{gateway}
    public class PaymentWebhookController : Controller
    {
        private readonly IPaymentService _paymentService;
        private readonly IMembershipPaymentService _membershipService;
        private readonly IListingPaymentService _listingService;

        public PaymentWebhookController()
        {
            _membershipService = new MembershipPaymentService();
            _listingService = new ListingPaymentService();
            _paymentService = new PaymentService(_membershipService, _listingService);
        }

        [HttpGet, HttpPost]
        [ValidateInput(false)]
        public ActionResult Handle(string gateway)
        {
            try
            {
                var gw = (gateway ?? "unknown").ToLowerInvariant();

                // VNPAY IPN dùng GET kèm query
                if (gw == "vnpay" && Request.HttpMethod == "GET")
                {
                    var raw = Request?.Url?.Query ?? "";
                    var orderId = Request["vnp_TxnRef"];
                    var sig = Request["vnp_SecureHash"];

                    var verify = _paymentService.Verify("vnpay", orderId, rawPayload: raw, signature: sig);
                    if (verify.Ok && verify.Status == PaymentStatus.Succeeded)
                        return Content("RspCode=00&Message=Confirm Success");   
                    if (!verify.Ok)
                        return Content("RspCode=97&Message=Invalid Signature");
                    return Content("RspCode=01&Message=Transaction Failed");
                }

                // Gateway khác (fallback)
                var rawBody = ReadRawBody();
                var signature = Request.Headers["X-Signature"]
                                ?? Request.Headers["x-signature"]
                                ?? Request.Headers["Signature"];
                var orderIdGuess = Request["orderId"] ?? Request["order_id"];
                var verifyDefault = _paymentService.Verify(gw, orderIdGuess, rawPayload: rawBody, signature: signature);

                return verifyDefault.Ok ? new HttpStatusCodeResult(200) : new HttpStatusCodeResult(400, verifyDefault.Message);
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(500, "Webhook error: " + ex.Message);
            }
        }

        private string ReadRawBody()
        {
            Request.InputStream.Position = 0;
            using (var reader = new StreamReader(Request.InputStream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }
    }
}