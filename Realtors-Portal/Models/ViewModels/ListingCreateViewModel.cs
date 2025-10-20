using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace Realtors_Portal.Models.ViewModel
{
    public class ListingCreateViewModel
    {
        // ====== Property ======
        [Required (ErrorMessage = "Người đăng không xác định")]
        public int CustomerID { get; set; }
        [Required (ErrorMessage = "Cho bán hay cho thuê?")]
        public int CategoryID { get; set; }
        [Required(ErrorMessage = "Nằm ở tỉnh/thành phố nào?")]
        public int CityID { get; set; }
        [Required(ErrorMessage = "Nằm ở quận/huyện nào?")]
        public int DistrictID { get; set; }
        [Required(ErrorMessage = "Nằm ở phường/xã nào?")]
        public int WardID { get; set; }
        [Required (ErrorMessage = "Nằm ở đường/phố nào?")]
        public int AddressID { get; set; }
        [Required (ErrorMessage = "Tiêu đề bài đăng là gì?")]
        public string Title { get; set; }
        public string Description { get; set; } = "";
        [Range(0.01, double.MaxValue, ErrorMessage = "Giá tiền không hợp lệ")]
        public decimal Price { get; set; }
        [Range(0.01, double.MaxValue, ErrorMessage = "Diện tích không hợp lệ")]
        public decimal Area { get; set; }
        [RegularExpression(@"^(Sổ đỏ/hồng|Hợp đồng mua bán|Đang chờ sổ)$", ErrorMessage = "Loại giấy tờ không hợp lệ")]
        public string LegalStatus { get; set; }
        [Required (ErrorMessage = "Loại hình BĐS nào?")]
        public int PropertyTypeID { get; set; }

        // ====== PropertyDetail ======
        public int? Bedrooms { get; set; }
        public int? Bathrooms { get; set; }
        public int? Floors { get; set; }
        public decimal? FrontWidth { get; set; }
        [RegularExpression("^(Đông|Tây|Nam|Bắc)$", ErrorMessage = "Hướng không hợp lệ")]
        public string Direction { get; set; } = "";
        public string Furniture { get; set; } = "";
        public bool HasBalcony { get; set; }
        public bool HasGarage { get; set; }
        public bool HasGarden { get; set; }
        public bool HasElevator { get; set; }
        public string AdditionalInfo { get; set; } = "";

        // ====== Listing ======
        [Required (ErrorMessage = "Dùng gói đăng tin nào?")]
        public int PackageID { get; set; }
        public string Location { get; set; } = "";

        // ====== Images ======
        public List<HttpPostedFileBase> Images { get; set; }
    }
}