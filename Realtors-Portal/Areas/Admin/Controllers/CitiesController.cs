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
    public class CitiesController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Admin/Cities
        public ActionResult Index()
        {
            var cities = db.Cities.OrderBy(c => c.CityName).ToList();
            return View(cities);
        }

        // GET: Admin/Cities/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            City city = db.Cities.Find(id);
            if (city == null)
                return HttpNotFound();

            return View(city);
        }

        // GET: Admin/Cities/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Cities/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "CityName,IsActive")] City city)
        {
            if (ModelState.IsValid)
            {
                db.Cities.Add(city);
                db.SaveChanges();
                TempData["Success"] = "Thêm thành phố mới thành công!";
                return RedirectToAction("Index");
            }

            TempData["Error"] = "Thêm thất bại. Vui lòng kiểm tra lại thông tin.";
            return View(city);
        }

        // GET: Admin/Cities/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            City city = db.Cities.Find(id);
            if (city == null)
                return HttpNotFound();

            return View(city);
        }

        // POST: Admin/Cities/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "CityID,CityName,IsActive")] City city)
        {
            if (ModelState.IsValid)
            {
                db.Entry(city).State = EntityState.Modified;
                db.SaveChanges();
                TempData["Success"] = "Cập nhật thành phố thành công!";
                return RedirectToAction("Index");
            }

            TempData["Error"] = "Cập nhật thất bại. Vui lòng kiểm tra lại.";
            return View(city);
        }

        // GET: Admin/Cities/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            City city = db.Cities.Find(id);
            if (city == null)
                return HttpNotFound();

            return View(city);
        }

        // POST: Admin/Cities/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            City city = db.Cities.Find(id);
            if (city != null)
            {
                db.Cities.Remove(city);
                db.SaveChanges();
                TempData["Success"] = "Xóa thành phố thành công!";
            }
            else
            {
                TempData["Error"] = "Không tìm thấy dữ liệu để xóa.";
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
