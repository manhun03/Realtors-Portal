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
    public class PackagesController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Admin/Packages
        

        public ActionResult Index(string type, bool? active)
        {
            var packages = db.Packages.AsQueryable();

            if (!string.IsNullOrEmpty(type))
                packages = packages.Where(p => p.PackageType == type);
            if (active.HasValue)
                packages = packages.Where(p => p.IsActive == active.Value);

            ViewBag.Type = type;
            ViewBag.Active = active;
            return View(packages.ToList());
        }


        // GET: Admin/Packages/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Package package = db.Packages.Find(id);
            if (package == null)
            {
                return HttpNotFound();
            }
            return View(package);
        }

        // GET: Admin/Packages/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Packages/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "PackageName,Description,PackageType,DurationDays,Price,DiscountPercent,Features,Multiplier,IsActive")] Package package)
        {
            if (ModelState.IsValid)
            {
                package.CreatedAt = DateTime.Now;
                package.UpdatedAt = DateTime.Now;
                db.Packages.Add(package);
                db.SaveChanges();
                TempData["Success"] = "Tạo gói mới thành công!";
                return RedirectToAction("Index");
            }
            return View(package);
        }

        // GET: Admin/Packages/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Package package = db.Packages.Find(id);
            if (package == null)
            {
                return HttpNotFound();
            }
            return View(package);
        }

        // POST: Admin/Packages/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "PackageID,PackageName,Description,PackageType,DurationDays,Price,DiscountPercent,Features,Multiplier,IsActive")] Package package)
        {
            if (ModelState.IsValid)
            {
                var existing = db.Packages.Find(package.PackageID);
                if (existing == null)
                {
                    return HttpNotFound();
                }

                // Cập nhật thủ công để tránh lỗi overposting
                existing.PackageName = package.PackageName;
                existing.Description = package.Description;
                existing.PackageType = package.PackageType;
                existing.DurationDays = package.DurationDays;
                existing.Price = package.Price;
                existing.DiscountPercent = package.DiscountPercent;
                existing.Features = package.Features;
                existing.Multiplier = package.Multiplier;
                existing.IsActive = package.IsActive;
                existing.UpdatedAt = DateTime.Now;

                db.SaveChanges();
                TempData["Success"] = "Cập nhật gói thành công!";
                return RedirectToAction("Index");
            }
            return View(package);
        }

        // GET: Admin/Packages/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Package package = db.Packages.Find(id);
            if (package == null)
            {
                return HttpNotFound();
            }
            return View(package);
        }


        // POST: Admin/Packages/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Package package = db.Packages.Find(id);
            db.Packages.Remove(package);
            db.SaveChanges();
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
