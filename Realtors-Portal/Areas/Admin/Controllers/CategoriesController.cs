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
    //[Authorize(Roles = "Admin,Employee")]
    public class CategoriesController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Admin/Categories
        public ActionResult Index()
        {
            var categories = db.Categories.ToList();
            return View(categories);
        }

        // GET: Admin/Categories/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            var category = db.Categories.Find(id);
            if (category == null)
                return HttpNotFound();

            return View(category);
        }

        // GET: Admin/Categories/Create
        public ActionResult Create()
        {
            ViewBag.ParentCategories = new SelectList(db.Categories, "CategoryID", "CategoryName");
            return View();
        }

        // POST: Admin/Categories/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Category category)
        {
            if (ModelState.IsValid)
            {
                db.Categories.Add(category);
                db.SaveChanges();
                TempData["Success"] = "Thêm danh mục mới thành công!";
                return RedirectToAction("Index");
            }

            ViewBag.ParentCategories = new SelectList(db.Categories, "CategoryID", "CategoryName", category.ParentCategoryID);
            TempData["Error"] = "Không thể thêm danh mục. Vui lòng kiểm tra lại thông tin.";
            return View(category);
        }

        // GET: Admin/Categories/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            var category = db.Categories.Find(id);
            if (category == null)
                return HttpNotFound();

            // Lấy các danh mục khác (không bao gồm chính nó)
            var categories = db.Categories.Where(c => c.CategoryID != category.CategoryID).ToList();
            ViewBag.ParentCategories = new SelectList(categories, "CategoryID", "CategoryName", category.ParentCategoryID);

            return View(category);
        }

        // POST: Admin/Categories/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Category category)
        {
            if (ModelState.IsValid)
            {
                db.Entry(category).State = EntityState.Modified;
                db.SaveChanges();
                TempData["Success"] = "Cập nhật danh mục thành công!";
                return RedirectToAction("Index");
            }

            ViewBag.ParentCategories = new SelectList(
                db.Categories.Where(c => c.CategoryID != category.CategoryID),
                "CategoryID", "CategoryName", category.ParentCategoryID
            );
            TempData["Error"] = "Không thể cập nhật danh mục. Vui lòng thử lại!";
            return View(category);
        }

        // GET: Admin/Categories/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            var category = db.Categories.Find(id);
            if (category == null)
                return HttpNotFound();

            return View(category);
        }

        // POST: Admin/Categories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var category = db.Categories.Find(id);

            // Ngăn xoá nếu có danh mục con
            if (db.Categories.Any(c => c.ParentCategoryID == id))
            {
                TempData["Error"] = "Không thể xóa danh mục vì vẫn còn danh mục con!";
                return RedirectToAction("Index");
            }

            db.Categories.Remove(category);
            db.SaveChanges();
            TempData["Success"] = "Xóa danh mục thành công!";
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
