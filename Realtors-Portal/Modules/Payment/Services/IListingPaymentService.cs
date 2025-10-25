using Realtors_Portal.Modules.Payment.Models;

namespace Realtors_Portal.Modules.Payment.Services
{
    /// Dịch vụ riêng cho luồng thanh toán tin đăng (khi vượt quá).
    public interface IListingPaymentService
    {
        /// Lấy giá mua tin
        decimal GetListingPrice(int listingCount, PlanTier? currentPlan = null, string currencyCode = null);

        /// Sau khi thanh toán thành công: cộng thêm quota tin đăng cho user.
        bool AddListingQuota(string customerId, int listingCount, VerifyResult verify);
    }
}
