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
    public class AddressesController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Admin/Addresses
        public ActionResult Index()
        {
            var addresses = db.Addresses.Include(a => a.City).Include(a => a.District).Include(a => a.Ward);
            return View(addresses.ToList());
        }

        // GET: Admin/Addresses/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Address address = db.Addresses.Find(id);
            if (address == null)
            {
                return HttpNotFound();
            }
            return View(address);
        }

        // GET: Admin/Addresses/Create
        public ActionResult Create()
        {
            ViewBag.CityID = new SelectList(db.Cities, "CityID", "CityName");
            ViewBag.DistrictID = new SelectList(db.Districts, "DistrictID", "DistrictName");
            ViewBag.WardID = new SelectList(db.Wards, "WardID", "WardName");
            return View();
        }

        // POST: Admin/Addresses/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "AddressID,CityID,DistrictID,WardID,Street,HouseNumber,FullAddress")] Address address)
        {
            if (ModelState.IsValid)
            {
                db.Addresses.Add(address);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CityID = new SelectList(db.Cities, "CityID", "CityName", address.CityID);
            ViewBag.DistrictID = new SelectList(db.Districts, "DistrictID", "DistrictName", address.DistrictID);
            ViewBag.WardID = new SelectList(db.Wards, "WardID", "WardName", address.WardID);
            return View(address);
        }

        // GET: Admin/Addresses/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Address address = db.Addresses.Find(id);
            if (address == null)
            {
                return HttpNotFound();
            }
            ViewBag.CityID = new SelectList(db.Cities, "CityID", "CityName", address.CityID);
            ViewBag.DistrictID = new SelectList(db.Districts, "DistrictID", "DistrictName", address.DistrictID);
            ViewBag.WardID = new SelectList(db.Wards, "WardID", "WardName", address.WardID);
            return View(address);
        }

        // POST: Admin/Addresses/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "AddressID,CityID,DistrictID,WardID,Street,HouseNumber,FullAddress")] Address address)
        {
            if (ModelState.IsValid)
            {
                db.Entry(address).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CityID = new SelectList(db.Cities, "CityID", "CityName", address.CityID);
            ViewBag.DistrictID = new SelectList(db.Districts, "DistrictID", "DistrictName", address.DistrictID);
            ViewBag.WardID = new SelectList(db.Wards, "WardID", "WardName", address.WardID);
            return View(address);
        }

        // GET: Admin/Addresses/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Address address = db.Addresses.Find(id);
            if (address == null)
            {
                return HttpNotFound();
            }
            return View(address);
        }

        // POST: Admin/Addresses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Address address = db.Addresses.Find(id);
            db.Addresses.Remove(address);
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
