using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using RealtorsPortal.Models;

namespace RealtorsPortal.Controllers
{
    public class CategoriesController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Categories
        public ActionResult Index()
        {
            var categories = db.Categories.Include(c => c.Category2).ToList(); // Category2 = Parent
            return View(categories);
        }

        // GET: Categories/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            Category category = db.Categories.Find(id);
            if (category == null)
                return HttpNotFound();

            return View(category);
        }

        // GET: Categories/Create
        public ActionResult Create()
        {
            // Dropdown: option "None" cho category cha
            ViewBag.ParentCategoryID = new SelectList(db.Categories, "CategoryID", "CategoryName");
            return View();
        }

        // POST: Categories/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "CategoryID,CategoryName,Description,ParentCategoryID")] Category category)
        {
            if (ModelState.IsValid)
            {
                db.Categories.Add(category);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ParentCategoryID = new SelectList(db.Categories, "CategoryID", "CategoryName", category.ParentCategoryID);
            return View(category);
        }

        // GET: Categories/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            Category category = db.Categories.Find(id);
            if (category == null)
                return HttpNotFound();

            // Lấy danh sách category khác (không lấy chính nó) để làm dropdown
            var categories = db.Categories.Where(c => c.CategoryID != category.CategoryID).ToList();

            // Tạo SelectList với option "None" cho danh mục cha
            ViewBag.ParentCategoryID = new SelectList(categories, "CategoryID", "CategoryName", category.ParentCategoryID);

            return View(category);
        }


        // POST: Categories/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "CategoryID,CategoryName,Description,ParentCategoryID")] Category category)
        {
            if (ModelState.IsValid)
            {
                db.Entry(category).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ParentCategoryID = new SelectList(
                db.Categories.Where(c => c.CategoryID != category.CategoryID),
                "CategoryID", "CategoryName",
                category.ParentCategoryID
            );
            return View(category);
        }

        // GET: Categories/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            Category category = db.Categories.Find(id);
            if (category == null)
                return HttpNotFound();

            return View(category);
        }

        // POST: Categories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Category category = db.Categories.Find(id);

            // Kiểm tra có subcategories
            var hasChildren = db.Categories.Any(c => c.ParentCategoryID == id);
            if (hasChildren)
            {
                ModelState.AddModelError("", "Cannot delete category that has subcategories.");
                return View(category);
            }

            db.Categories.Remove(category);
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
