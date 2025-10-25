using System;
using Realtors_Portal.Modules.Payment.Models;

namespace Realtors_Portal.Modules.Payment.Services
{
    public class ListingPaymentService : IListingPaymentService
    {
        public decimal GetListingPrice(int listingCount, PlanTier? currentPlan = null, string currencyCode = null)
        {
            if (listingCount <= 0) return 0m;
            // TODO: có thể giảm giá theo plan (VD Vàng/Kim Cương rẻ hơn)
            var unit = PaymentConfig.Pricing.ListingPricePerPost;
            return unit * listingCount;
        }

        public bool AddListingQuota(string customerId, int listingCount, VerifyResult verify)
        {
            // TODO: cộng quota tin đăng cho user trong DB
            return true;
        }
    }
}
