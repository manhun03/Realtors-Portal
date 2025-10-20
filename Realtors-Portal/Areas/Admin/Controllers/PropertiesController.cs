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
    public class PropertiesController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Admin/Properties
        public ActionResult Index()
        {
            var properties = db.Properties.Include(p => p.Address).Include(p => p.Category).Include(p => p.Customer);
            return View(properties.ToList());
        }

        // GET: Admin/Properties/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Property property = db.Properties.Find(id);
            if (property == null)
            {
                return HttpNotFound();
            }
            return View(property);
        }

        // GET: Admin/Properties/Create
        public ActionResult Create()
        {
            ViewBag.AddressID = new SelectList(db.Addresses, "AddressID", "Street");
            ViewBag.CategoryID = new SelectList(db.Categories, "CategoryID", "CategoryName");
            ViewBag.CustomerID = new SelectList(db.Customers, "CustomerID", "FullName");
            return View();
        }

        // POST: Admin/Properties/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "PropertyID,CustomerID,CategoryID,AddressID,Title,Description,Price,Area,LegalStatus,PropertyType,CreatedAt,UpdatedAt")] Property property)
        {
            if (ModelState.IsValid)
            {
                db.Properties.Add(property);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.AddressID = new SelectList(db.Addresses, "AddressID", "Street", property.AddressID);
            ViewBag.CategoryID = new SelectList(db.Categories, "CategoryID", "CategoryName", property.CategoryID);
            ViewBag.CustomerID = new SelectList(db.Customers, "CustomerID", "FullName", property.CustomerID);
            return View(property);
        }

        // GET: Admin/Properties/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Property property = db.Properties.Find(id);
            if (property == null)
            {
                return HttpNotFound();
            }
            ViewBag.AddressID = new SelectList(db.Addresses, "AddressID", "Street", property.AddressID);
            ViewBag.CategoryID = new SelectList(db.Categories, "CategoryID", "CategoryName", property.CategoryID);
            ViewBag.CustomerID = new SelectList(db.Customers, "CustomerID", "FullName", property.CustomerID);
            return View(property);
        }

        // POST: Admin/Properties/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "PropertyID,CustomerID,CategoryID,AddressID,Title,Description,Price,Area,LegalStatus,PropertyType,CreatedAt,UpdatedAt")] Property property)
        {
            if (ModelState.IsValid)
            {
                db.Entry(property).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.AddressID = new SelectList(db.Addresses, "AddressID", "Street", property.AddressID);
            ViewBag.CategoryID = new SelectList(db.Categories, "CategoryID", "CategoryName", property.CategoryID);
            ViewBag.CustomerID = new SelectList(db.Customers, "CustomerID", "FullName", property.CustomerID);
            return View(property);
        }

        // GET: Admin/Properties/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Property property = db.Properties.Find(id);
            if (property == null)
            {
                return HttpNotFound();
            }
            return View(property);
        }

        // POST: Admin/Properties/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Property property = db.Properties.Find(id);
            db.Properties.Remove(property);
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
