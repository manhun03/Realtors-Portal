using System;

namespace Realtors_Portal.Modules.Payment.Models
{
    public enum PlanTier
    {
        Dong = 1,  
        Vang = 2,
        KimCuong = 3
    }

    public enum PaymentPurpose
    {
        Membership = 1,   // Mua gói hội viên
        Listing = 2   // Mua thêm lượt/tin đăng
    }

    public enum PaymentStatus
    {
        Pending = 0,
        Succeeded = 1,
        Failed = 2,
        Canceled = 3
    }
}
