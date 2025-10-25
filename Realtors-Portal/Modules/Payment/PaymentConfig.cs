using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Realtors_Portal.Modules.Payment
{
    /// Cấu hình cho module Payment: route, cài đặt cơ bản, webhook URL...
    public class PaymentConfig
    {
        // Cấu hình cơ bản
        public static string DefaultCurrencyCode = "VND";
        public static string WebhookBasePath = "webhooks/payment";  // /webhooks/payment/{gateway}
        public static string ReturnBasePath = "payment/return";     // /payment/return/{gateway}
        public static string CancelBasePath = "payment/cancel";     // /payment/cancel/{gateway}

        /// Đăng ký route cho module Payment.
        /// Gọi hàm này trong Application_Start (Global.asax)
        public static void RegisterRoutes(RouteCollection routes)
        {
            if (routes == null) throw new ArgumentNullException(nameof(routes));

            // Webhook từ cổng thanh toán
            routes.MapRoute(
                name: "Payment_Webhook",
                url: WebhookBasePath + "/{gateway}",
                defaults: new { controller = "PaymentWebhook", action = "Handle", gateway = UrlParameter.Optional },
                namespaces: new[] { "Realtors_Portal.Modules.Payment.Webhooks" }
            );

            // Return URL (redirect user sau khi thanh toán)
            routes.MapRoute(
                name: "Payment_Return",
                url: ReturnBasePath + "/{gateway}",
                defaults: new { controller = "Payment", action = "Return", gateway = UrlParameter.Optional },
                namespaces: new[] { "Realtors_Portal.Modules.Payment.Controllers" }
            );

            // Cancel URL
            routes.MapRoute(
                name: "Payment_Cancel",
                url: CancelBasePath + "/{gateway}",
                defaults: new { controller = "Payment", action = "Cancel", gateway = UrlParameter.Optional },
                namespaces: new[] { "Realtors_Portal.Modules.Payment.Controllers" }
            );

            // Default Payment API
            routes.MapRoute(
                name: "Payment_Default",
                url: "payment/{action}/{id}",
                defaults: new { controller = "Payment", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "Realtors_Portal.Modules.Payment.Controllers" }
            );
        }
        public static class Pricing
        {
            // Giá gói hội viên (VND)
            public const decimal PlanPrice_Dong = 199000m;
            public const decimal PlanPrice_Vang = 499000m;
            public const decimal PlanPrice_KimCuong = 999000m;

            // Số tin miễn phí theo gói
            public const int FreeListings_Dong = 10;
            public const int FreeListings_Vang = 30;
            public const int FreeListings_KimCuong = 80;

            // Giá mua thêm tin (VND)
            public const decimal ListingPricePerPost = 10000m;

            // (Tùy chọn) Nếu bạn muốn tra cứu theo "tên gói" string:
            public static decimal GetPlanPrice(string planName)
            {
                switch ((planName ?? "").Trim().ToLowerInvariant())
                {
                    case "dong":
                    case "đồng":
                        return PlanPrice_Dong;
                    case "vang":
                    case "vàng":
                        return PlanPrice_Vang;
                    case "kimcuong":
                    case "kim cương":
                        return PlanPrice_KimCuong;
                    default:
                        throw new ArgumentException("Plan không hợp lệ (dong/vang/kimcuong).");
                }
            }

            public static int GetFreeListings(string planName)
            {
                switch ((planName ?? "").Trim().ToLowerInvariant())
                {
                    case "dong":
                    case "đồng":
                        return FreeListings_Dong;
                    case "vang":
                    case "vàng":
                        return FreeListings_Vang;
                    case "kimcuong":
                    case "kim cương":
                        return FreeListings_KimCuong;
                    default:
                        return 0;
                }
            }
        }
    }
}
