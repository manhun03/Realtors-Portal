using System;
using System.Linq;
using Realtors_Portal.Models;

namespace Realtors_Portal.Modules.Payment.Services
{
    public interface ICurrencyService
    {
        /// Trả tỷ giá (giả định 1 đơn vị ngoại tệ = X VND). Không tìm thấy → 1m.
        decimal GetExchangeRate(string currencyCode);
    }

    public class CurrencyService : ICurrencyService
    {
        public decimal GetExchangeRate(string currencyCode)
        {
            if (string.IsNullOrWhiteSpace(currencyCode)) return 1m;
            var code = currencyCode.Trim().ToUpperInvariant();

            using (var db = new RealtorsPortalEntities())
            {
                var c = db.Currencies.FirstOrDefault(x => x.CurrencyCode == code);
                if (c == null) return 1m;

                return c.ExchangeRate ?? 1m;
            }
        }
    }
}
