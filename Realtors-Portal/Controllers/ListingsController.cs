using Realtors_Portal.Models;
using Realtors_Portal.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace Realtors_Portal.Controllers
{
    public class ListingsController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        //Listing create
        //Author: Nguyen Manh Hung, Le Quang Dung
        public ActionResult Create()
        {
            //Kiểm tra đăng nhập hay chưa
            if (Session["UserID"] == null || Session["CustomerID"] == null)
            {
                return RedirectToAction("Login", "UserAccounts");
            }

            //Lấy CustomerID từ Session
            ListingCreateViewModel model = new ListingCreateViewModel()
            {
                CustomerID = Convert.ToInt32(Session["CustomerID"])
            };

            //Tạo dropdownlist
            CreateDropDownLists();

            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(ListingCreateViewModel model)
        {
            //Validate lần 1 (check required, đúng format)
            bool check = true;
            if (!ModelState.IsValid)
            {
                check = false;
            }
            //Kiểm tra các file tải lên
            if (model.Images == null || model.Images.Count() < 3 || model.Images.Any(f => f == null || f.ContentLength == 0))
            {
                ModelState.AddModelError("Images", "Upload ít nhất ba ảnh");
                check = false;
            }
            if (!check)
            {
                CreateDropDownLists(model);
                return View(model);
            }
            //Validate lần 2 (kiểm tra tồn tại trong csdl)
            if (!CheckExistence(model, out ListingCreateViewModel validatedModel))
            {
                //Tạo dropdownlist
                CreateDropDownLists(model);

                return View(validatedModel);
            }
            ;

            var transaction = db.Database.BeginTransaction();
            string propertyFolder = null;
            try
            {
                //Tạo Property
                var property = new Property
                {
                    CustomerID = model.CustomerID,
                    CategoryID = model.CategoryID,
                    AddressID = model.AddressID,
                    Title = model.Title,
                    Description = model.Description,
                    Price = model.Price,
                    Area = model.Area,
                    LegalStatus = model.LegalStatus,
                    PropertyType = db.PropertyTypes
                        .Where(p => p.PropertyTypeID == model.PropertyTypeID)
                        .Select(p => p.TypeName)
                        .FirstOrDefault(),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    PropertyTypeID = model.PropertyTypeID,
                };
                db.Properties.Add(property);
                db.SaveChanges();

                //Tạo PropertyDetail
                var propertyDetail = new PropertyDetail
                {
                    PropertyID = property.PropertyID,
                    Bedrooms = model.Bedrooms,
                    Bathrooms = model.Bathrooms,
                    Floors = model.Floors,
                    FrontWidth = model.FrontWidth,
                    Direction = model.Direction,
                    Furniture = model.Furniture,
                    HasBalcony = model.HasBalcony,
                    HasGarage = model.HasGarage,
                    HasGarden = model.HasGarden,
                    HasElevator = model.HasElevator,
                    AdditionalInfo = model.AdditionalInfo
                };
                db.PropertyDetails.Add(propertyDetail);
                db.SaveChanges();
                int PropertyID = property.PropertyID;

                //Tạo PropertyImage, xử lí file ảnh
                //Tạo folder với tên là ID của Property
                propertyFolder = Server.MapPath($"~/Content/Uploads/Properties/{PropertyID}");
                Directory.CreateDirectory(propertyFolder);

                //Thêm từng ảnh vào db và upload từng ảnh lên server
                int SortOrder = 0;
                foreach (var file in model.Images)
                {
                    if (file != null && file.ContentLength > 0)
                    {
                        //Lấy đuôi của file ảnh (".jpg", ".png", ...)
                        string extension = Path.GetExtension(file.FileName);
                        //Tạo tên của file ảnh
                        string fileName = $"{PropertyID}_{SortOrder}{extension}";
                        //Ghép đường dẫn của folder và tên file vào (để lưu lên server)
                        string filePath = Path.Combine(propertyFolder, fileName);
                        //Upload lên server
                        file.SaveAs(filePath);

                        //Tạo PropertyImage
                        var image = new PropertyImage
                        {
                            PropertyID = PropertyID,
                            ImageUrl = $"/Content/Uploads/Properties/{PropertyID}/{fileName}",
                            IsMain = SortOrder == 0 ? true : false,
                            SortOrder = SortOrder,
                            UploadedAt = DateTime.Now
                        };
                        db.PropertyImages.Add(image);
                        SortOrder++;
                    }
                }
                db.SaveChanges();

                //Tạo Listing
                var listing = new Listing
                {
                    CustomerID = model.CustomerID,
                    PackageID = model.PackageID,
                    CategoryID = model.CategoryID,
                    PropertyID = PropertyID,
                    Title = model.Title,
                    Description = model.Description,
                    Price = model.Price,
                    Location = model.Location,
                    CreatedAt = DateTime.Now,
                    Status = "Pending",
                    ViewCount = 0,
                    BoostCount = 0,
                    IsFeatured = false
                };
                db.Listings.Add(listing);
                db.SaveChanges();

                //Thay đổi dữ liệu trong database nếu không lỗi
                transaction.Commit();

                //Chuyển sang bước thanh toán
                return RedirectToAction("Checkout", "Payments", new { listingId = listing.ListingID });
            }
            catch (Exception ex)
            {
                //Không thay đổi dữ liệu trong database nếu có lỗi
                transaction.Rollback();

                //Xóa folder ảnh (nếu đã tạo)
                if (!string.IsNullOrEmpty(propertyFolder) && Directory.Exists(propertyFolder))
                {
                    Directory.Delete(propertyFolder, true); //true ở đây để xóa hết các thứ bên trong
                }

                //In lỗi ra màn hình (Cái này để test, khi xong thì thay bằng message khác)
                ModelState.AddModelError("", ex.InnerException.InnerException.Message);

                //Tạo dropdownlist
                CreateDropDownLists(model);

                return View(model);
            }
        }

        //Hàm tạo các dropdownlist cần thiết
        //Author: Le Quang Dung
        private void CreateDropDownLists(ListingCreateViewModel model = null)
        {
            //Tạo Category
            List<Category> cateList = db.Categories.ToList();
            ViewBag.CategoryID = new SelectList(cateList, "CategoryID", "CategoryName", model?.CategoryID);

            //Tạo City
            List<City> cityList = db.Cities.Where(c => c.IsActive == true).ToList();
            ViewBag.CityID = new SelectList(cityList, "CityID", "CityName");

            //Tạo Package
            List<Package> packList = db.Packages
                .Where(p => p.PackageType == "Listing" && p.IsActive == true)
                .ToList();
            ViewBag.PackageID = new SelectList(packList, "PackageID", "PackageName", model?.PackageID);

            //Tạo PropertyType 
            List<PropertyType> propTypeList = db.PropertyTypes.Where(pt => pt.IsActive == true).ToList();
            ViewBag.PropertyTypeID = new SelectList(propTypeList, "PropertyTypeID", "TypeName", model?.PropertyTypeID);

            //Tạo LegalStatus
            List<string> legalStatList = new List<string> { "Sổ đỏ/hồng", "Hợp đồng mua bán", "Đang chờ sổ" };
            ViewBag.LegalStatus = new SelectList(legalStatList);

            //Tạo Direction
            List<string> directionList = new List<string> { "Đông", "Tây", "Nam", "Bắc" };
            ViewBag.Direction = new SelectList(directionList);
        }

        //Hàm kiểm tra tồn tại trong database
        //Author: Le Quang Dung
        private bool CheckExistence(ListingCreateViewModel model, out ListingCreateViewModel validatedModel)
        {
            bool isValid = true;
            validatedModel = model;

            //Validate CustomerID
            Customer cust = db.Customers.FirstOrDefault(c => c.CustomerID == model.CustomerID);
            if (cust == null)
            {
                isValid = false;
            }
            else if (!cust.UserAccount.IsActive)
            {
                isValid = false;
            }
            if (!isValid)
            {
                ModelState.AddModelError("CustomerID", "Tài khoản không hợp lệ, đăng nhập lại");
            }

            //Validate CategoryID
            Category cate = db.Categories.FirstOrDefault(c => c.CategoryID == model.CategoryID);
            if (cate == null)
            {
                isValid = false;
                ModelState.AddModelError("CategoryID", "Chọn lại mục này");
            }

            //Validate CityID
            City city = db.Cities.FirstOrDefault(c => c.CityID == model.CityID && c.IsActive == true);
            if (city == null)
            {
                isValid = false;
                ModelState.AddModelError("CityID", "Chọn lại mục này");
            }

            //Validate DistrictID
            District dist = db.Districts.FirstOrDefault(c => c.DistrictID == model.DistrictID && c.IsActive == true);
            if (dist == null)
            {
                isValid = false;
                ModelState.AddModelError("DistrictID", "Chọn lại mục này");
            }

            //Validate WardID
            Ward ward = db.Wards.FirstOrDefault(c => c.WardID == model.WardID && c.IsActive == true);
            if (ward == null)
            {
                isValid = false;
                ModelState.AddModelError("WardID", "Chọn lại mục này");
            }

            //Validate DistrictID
            Address address = db.Addresses.FirstOrDefault(c => c.AddressID == model.AddressID);
            if (address == null)
            {
                isValid = false;
                ModelState.AddModelError("AddressID", "Chọn lại mục này");
            }

            //Validate PropertyTypeID
            PropertyType propType = db.PropertyTypes.FirstOrDefault(pt => pt.PropertyTypeID == model.PropertyTypeID &&
                                                                          pt.IsActive == true);
            if (propType == null)
            {
                isValid = false;
                ModelState.AddModelError("PropertypeID", "Chọn lại mục này");
            }

            //Validate PackageID
            Package pack = db.Packages.FirstOrDefault(p => p.PackageID == model.PackageID && p.IsActive == true);
            if (pack == null)
            {
                isValid = false;
                ModelState.AddModelError("PackageID", "Chọn lại mục này");
            }

            //Check isValid
            if (!isValid)
            {
                ModelState.AddModelError("", "Vài thông tin không xác định, tải lại trang hoặc đăng nhập lại");
            }

            return isValid;
        }

        //==============================Auto generated code by Entity Framework========================================
        //Listings list
        public ActionResult Index()
        {
            var listings = db.Listings.Include(l => l.Category).Include(l => l.Customer).Include(l => l.Employee).Include(l => l.Package).Include(l => l.Property);
            return View(listings.ToList());
        }

        //Listing's detail
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Listing listing = db.Listings.Find(id);
            if (listing == null)
            {
                return HttpNotFound();
            }
            return View(listing);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
