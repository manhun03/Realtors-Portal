using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Realtors_Portal.Modules.Payment.VnPay
{
    public static class VnPayHelper
    {
        public static string BuildPaymentUrl(
            VnPaySettings cfg,
            string orderId,
            long amountVnd,                  // VNPAY yêu cầu x100, không thập phân
            string ipAddr,
            string orderInfo,
            string returnUrlAbsolute,
            string bankCode = null,
            string locale = "vn",
            DateTime? expireUtc = null)
        {
            if (string.IsNullOrWhiteSpace(cfg?.TmnCode) || string.IsNullOrWhiteSpace(cfg?.HashSecret) || string.IsNullOrWhiteSpace(cfg?.PayUrl))
                throw new InvalidOperationException("Thiếu cấu hình VNPAY.");

            var createDt = ToVnPayTime(DateTime.UtcNow);
            var expireDt = ToVnPayTime(expireUtc ?? DateTime.UtcNow.AddMinutes(cfg.TimeoutMinutes));

            var data = new SortedDictionary<string, string>(StringComparer.Ordinal)
            {
                ["vnp_Version"] = "2.1.0",
                ["vnp_Command"] = "pay",
                ["vnp_TmnCode"] = cfg.TmnCode,
                ["vnp_Amount"] = (amountVnd * 100).ToString(CultureInfo.InvariantCulture), // x100
                ["vnp_CurrCode"] = "VND",
                ["vnp_TxnRef"] = orderId,
                ["vnp_OrderInfo"] = orderInfo,
                ["vnp_OrderType"] = "other",
                ["vnp_Locale"] = string.IsNullOrWhiteSpace(locale) ? "vn" : locale,
                ["vnp_ReturnUrl"] = returnUrlAbsolute,
                ["vnp_IpAddr"] = string.IsNullOrWhiteSpace(ipAddr) ? "127.0.0.1" : ipAddr,
                ["vnp_CreateDate"] = createDt,
                ["vnp_ExpireDate"] = expireDt
            };
            if (!string.IsNullOrWhiteSpace(bankCode))
                data["vnp_BankCode"] = bankCode;

            var query = BuildQuery(data);
            var secureHash = SignHmacSha512(cfg.HashSecret, query);
            return $"{cfg.PayUrl}?{query}&vnp_SecureHash={secureHash}";
        }

        public static bool ValidateSignature(string rawQueryOrForm, string secret, out Dictionary<string, string> kv)
        {
            kv = ParseQuery(rawQueryOrForm);
            if (!kv.TryGetValue("vnp_SecureHash", out var provided)) return false;
            kv.Remove("vnp_SecureHash");
            kv.Remove("vnp_SecureHashType");

            var query = BuildQuery(new SortedDictionary<string, string>(kv, StringComparer.Ordinal));
            var computed = SignHmacSha512(secret, query);
            return provided.Equals(computed, StringComparison.OrdinalIgnoreCase);
        }

        public static Dictionary<string, string> ParseQuery(string raw)
        {
            var dict = new Dictionary<string, string>(StringComparer.Ordinal);
            if (string.IsNullOrEmpty(raw)) return dict;

            // Accept raw like "a=b&c=d" or "?a=b&c=d"
            var s = raw.StartsWith("?") ? raw.Substring(1) : raw;
            var pairs = s.Split(new[] { '&' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var p in pairs)
            {
                var kv = p.Split(new[] { '=' }, 2);
                var k = HttpUtility.UrlDecode(kv[0] ?? "");
                var v = kv.Length > 1 ? HttpUtility.UrlDecode(kv[1] ?? "") : "";
                if (!string.IsNullOrEmpty(k)) dict[k] = v;
            }
            return dict;
        }

        private static string BuildQuery(IDictionary<string, string> data)
        {
            // VNPAY yêu cầu sort ASC và encode theo spec.
            var parts = data
                .Where(kv => !string.IsNullOrEmpty(kv.Value))
                .OrderBy(kv => kv.Key, StringComparer.Ordinal)
                .Select(kv => $"{WebUtility.UrlEncode(kv.Key)}={WebUtility.UrlEncode(kv.Value)}");
            return string.Join("&", parts);
        }

        private static string SignHmacSha512(string secret, string data)
        {
            var keyBytes = Encoding.UTF8.GetBytes(secret ?? "");
            var inputBytes = Encoding.UTF8.GetBytes(data ?? "");
            using (var hmac = new HMACSHA512(keyBytes))
            {
                var hash = hmac.ComputeHash(inputBytes);
                var sb = new StringBuilder(hash.Length * 2);
                foreach (var b in hash) sb.Append(b.ToString("x2"));
                return sb.ToString();
            }
        }

        private static string ToVnPayTime(DateTime utc)
        {
            //VNPAY dùng yyyyMMddHHmmss theo local VN, nhưng UTC cũng pass; giữ UTC cho ổn định server.
            return utc.ToString("yyyyMMddHHmmss");
        }
    }
}
