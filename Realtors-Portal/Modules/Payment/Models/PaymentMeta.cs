namespace Realtors_Portal.Modules.Payment.Models
{
    public class PaymentMeta
    {
        public PaymentPurpose Purpose { get; set; }
        public PlanTier? Plan { get; set; }
        public int? ListingCount { get; set; }
        public string CustomerId { get; set; }
        public string Currency { get; set; }
        public string Gateway { get; set; }
    }
}
