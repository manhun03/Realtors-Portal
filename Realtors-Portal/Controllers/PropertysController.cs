using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Realtors_Portal.Models;

namespace Realtors_Portal.Controllers
{
    public class PropertyController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Property
        public ActionResult Index()
        {
            var properties = db.Properties.Include(p => p.PropertyType)
                                          .Include(p => p.PropertyDetails)
                                          .Include(p => p.PropertyImages);
            return View(properties.ToList());
        }

        // GET: Property/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            var property = db.Properties.Include(p => p.PropertyDetails)
                                        .Include(p => p.PropertyImages)
                                        .Include(p => p.PropertyType)
                                        .FirstOrDefault(p => p.PropertyID == id);
            if (property == null) return HttpNotFound();
            return View(property);
        }

        // GET: Property/Create
        public ActionResult Create()
        {
            ViewBag.PropertyTypeID = new SelectList(db.PropertyTypes, "PropertyTypeID", "TypeName");
            return View();
        }

        // POST: Property/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Property property, PropertyDetail detail)
        {
            if (ModelState.IsValid)
            {
                db.Properties.Add(property);
                db.SaveChanges();

                detail.PropertyID = property.PropertyID;
                db.PropertyDetails.Add(detail);
                db.SaveChanges();

                return RedirectToAction("Index");
            }

            ViewBag.PropertyTypeID = new SelectList(db.PropertyTypes, "PropertyTypeID", "TypeName", property.PropertyTypeID);
            return View(property);
        }

        // GET: Property/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            Property property = db.Properties.Find(id);
            if (property == null) return HttpNotFound();

            ViewBag.PropertyTypeID = new SelectList(db.PropertyTypes, "PropertyTypeID", "TypeName", property.PropertyTypeID);
            return View(property);
        }

        // POST: Property/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Property property)
        {
            if (ModelState.IsValid)
            {
                db.Entry(property).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.PropertyTypeID = new SelectList(db.PropertyTypes, "PropertyTypeID", "TypeName", property.PropertyTypeID);
            return View(property);
        }

        // GET: Property/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            Property property = db.Properties.Find(id);
            if (property == null) return HttpNotFound();
            return View(property);
        }

        // POST: Property/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Property property = db.Properties.Find(id);

            // Xoá các liên kết liên quan
            var detail = db.PropertyDetails.FirstOrDefault(d => d.PropertyID == id);
            if (detail != null) db.PropertyDetails.Remove(detail);

            var images = db.PropertyImages.Where(i => i.PropertyID == id).ToList();
            foreach (var img in images) db.PropertyImages.Remove(img);

            db.Properties.Remove(property);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}
