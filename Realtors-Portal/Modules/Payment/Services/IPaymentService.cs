using Realtors_Portal.Modules.Payment.Models;

namespace Realtors_Portal.Modules.Payment.Services
{ 
    /// Service chung: tính tiền, khởi tạo thanh toán qua gateway, xác minh webhook/return.
    public interface IPaymentService
    {
        /// Tính tổng tiền phải trả dựa trên Purpose (Membership/Listing) + tham số.
        /// xét Currency, ExchangeRate.
        decimal CalculateAmount(CreatePaymentRequest req);
        /// Tạo thanh toán (khởi tạo với gateway, trả về checkout URL).
        PaymentInitResult CreatePayment(CreatePaymentRequest req);

        /// Xác minh kết quả thanh toán từ return/webhook.
        VerifyResult Verify(string gateway, string orderId, string rawPayload, string signature = null);
    }
}
