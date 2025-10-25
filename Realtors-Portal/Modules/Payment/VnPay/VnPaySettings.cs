using System;
using System.Configuration;

namespace Realtors_Portal.Modules.Payment.VnPay
{
    /// Cấu hình VNPAY web.config
    public class VnPaySettings
    {
        public string TmnCode { get; set; }
        public string HashSecret { get; set; }
        public string PayUrl { get; set; }   
        public string ReturnUrl { get; set; }            
        public int TimeoutMinutes { get; set; } = 15;

        public static VnPaySettings LoadFromConfig()
        {
            // gom key để deploy nhanh môi trường sandbox/prod.
            return new VnPaySettings
            {
                TmnCode = ConfigurationManager.AppSettings["VnPay:TmnCode"],
                HashSecret = ConfigurationManager.AppSettings["VnPay:HashSecret"],
                PayUrl = ConfigurationManager.AppSettings["VnPay:PayUrl"],
                ReturnUrl = ConfigurationManager.AppSettings["VnPay:ReturnUrl"],
                TimeoutMinutes = TryGetInt(ConfigurationManager.AppSettings["VnPay:TimeoutMinutes"], 15),
            };
        }

        private static int TryGetInt(string s, int defVal)
            => int.TryParse(s, out var v) ? v : defVal;
    }
}