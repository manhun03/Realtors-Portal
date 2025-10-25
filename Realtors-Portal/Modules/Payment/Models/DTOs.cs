using System;

namespace Realtors_Portal.Modules.Payment.Models
{
    public class CreatePaymentRequest
    {
        public PaymentPurpose Purpose { get; set; }

        // membership
        public PlanTier? Plan { get; set; }

        // listing
        public int? ListingCount { get; set; } 

        // common
        public string CurrencyCode { get; set; }  
        public string Gateway { get; set; }      
        public string OrderId { get; set; }      
        public string CustomerId { get; set; }   
        public string ReturnUrl { get; set; }   
        public string CancelUrl { get; set; }
        public string WebhookUrl { get; set; }   
        public string Description { get; set; }  
    }

    public class PaymentInitResult
    {
        public bool Ok { get; set; }
        public string OrderId { get; set; }
        public string Gateway { get; set; }
        public string Currency { get; set; }
        public decimal Amount { get; set; }          
        public string CheckoutUrl { get; set; }       
        public PaymentStatus Status { get; set; }      
        public string Message { get; set; }
    }

    public class VerifyResult
    {
        public bool Ok { get; set; }
        public string OrderId { get; set; }
        public string Gateway { get; set; }
        public PaymentStatus Status { get; set; }      
        public string TransactionId { get; set; }
        public decimal? PaidAmount { get; set; }
        public string PaidCurrency { get; set; }
        public string RawPayload { get; set; }       
        public string Message { get; set; }
    }
}
