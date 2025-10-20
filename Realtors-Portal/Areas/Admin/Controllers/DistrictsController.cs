using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Realtors_Portal.Models;

namespace Realtors_Portal.Areas.Admin.Controllers
{
    //[Authorize(Roles = "Admin")]
    public class DistrictsController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Admin/Districts
        public ActionResult Index()
        {
            var districts = db.Districts.Include(d => d.City).OrderBy(d => d.City.CityName).ThenBy(d => d.DistrictName).ToList();
            return View(districts);
        }

        // GET: Admin/Districts/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            District district = db.Districts.Include(d => d.City).FirstOrDefault(d => d.DistrictID == id);
            if (district == null)
                return HttpNotFound();

            return View(district);
        }

        // GET: Admin/Districts/Create
        public ActionResult Create()
        {
            ViewBag.CityID = new SelectList(db.Cities.Where(c => c.IsActive == true), "CityID", "CityName");
            return View();
        }

        // POST: Admin/Districts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "CityID,DistrictName,IsActive")] District district)
        {
            if (ModelState.IsValid)
            {
                db.Districts.Add(district);
                db.SaveChanges();
                TempData["Success"] = "Thêm quận/huyện mới thành công!";
                return RedirectToAction("Index");
            }

            TempData["Error"] = "Thêm thất bại, vui lòng kiểm tra lại thông tin.";
            ViewBag.CityID = new SelectList(db.Cities, "CityID", "CityName", district.CityID);
            return View(district);
        }

        // GET: Admin/Districts/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            District district = db.Districts.Find(id);
            if (district == null)
                return HttpNotFound();

            ViewBag.CityID = new SelectList(db.Cities, "CityID", "CityName", district.CityID);
            return View(district);
        }

        // POST: Admin/Districts/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "DistrictID,CityID,DistrictName,IsActive")] District district)
        {
            if (ModelState.IsValid)
            {
                db.Entry(district).State = EntityState.Modified;
                db.SaveChanges();
                TempData["Success"] = "Cập nhật quận/huyện thành công!";
                return RedirectToAction("Index");
            }

            TempData["Error"] = "Cập nhật thất bại, vui lòng kiểm tra lại.";
            ViewBag.CityID = new SelectList(db.Cities, "CityID", "CityName", district.CityID);
            return View(district);
        }

        // GET: Admin/Districts/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            District district = db.Districts.Include(d => d.City).FirstOrDefault(d => d.DistrictID == id);
            if (district == null)
                return HttpNotFound();

            return View(district);
        }

        // POST: Admin/Districts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            District district = db.Districts.Find(id);
            if (district != null)
            {
                db.Districts.Remove(district);
                db.SaveChanges();
                TempData["Success"] = "Xóa quận/huyện thành công!";
            }
            else
            {
                TempData["Error"] = "Không tìm thấy dữ liệu cần xóa.";
            }
            return RedirectToAction("Index");
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
