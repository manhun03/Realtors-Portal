using Realtors_Portal.Modules.Payment.Models;

namespace Realtors_Portal.Modules.Payment.Services
{
    /// Dịch vụ riêng cho luồng mua gói hội viên (customer → agent).
    public interface IMembershipPaymentService
    {
        /// Tính tiền gói theo PlanTier (đồng/vàng/kim cương).
        decimal GetPlanPrice(PlanTier plan, string currencyCode = null);

        /// Sau khi thanh toán thành công: nâng cấp quyền user → agent + gán bậc.
        bool ApplyMembership(string customerId, PlanTier plan, VerifyResult verify);
    }
}
