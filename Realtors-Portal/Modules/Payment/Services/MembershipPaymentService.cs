using System;
using Realtors_Portal.Modules.Payment.Models;

namespace Realtors_Portal.Modules.Payment.Services
{
    public class MembershipPaymentService : IMembershipPaymentService
    {
        public decimal GetPlanPrice(PlanTier plan, string currencyCode = null)
        { 
            switch (plan)
            {
                case PlanTier.Dong: return PaymentConfig.Pricing.PlanPrice_Dong;
                case PlanTier.Vang: return PaymentConfig.Pricing.PlanPrice_Vang;
                case PlanTier.KimCuong: return PaymentConfig.Pricing.PlanPrice_KimCuong;
                default: throw new ArgumentOutOfRangeException(nameof(plan));
            }
        }

        public bool ApplyMembership(string customerId, PlanTier plan, VerifyResult verify)
        {
           
            return true;
        }
    }
}
