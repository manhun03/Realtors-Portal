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
    public class SystemConfigsController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        // GET: Admin/SystemConfigs
        public ActionResult Index(string searchKey, string configType)
        {
            var configs = db.SystemConfigs.Include(s => s.Employee).AsQueryable();

            // Nếu có nhập từ khóa tìm kiếm
            if (!string.IsNullOrEmpty(searchKey))
            {
                configs = configs.Where(c => c.ConfigKey.Contains(searchKey));
            }

            // Nếu chọn loại cấu hình
            if (!string.IsNullOrEmpty(configType))
            {
                configs = configs.Where(c => c.ConfigType == configType);
            }

            // Lấy danh sách loại cấu hình (distinct)
            var typeList = db.SystemConfigs
                             .Select(c => c.ConfigType)
                             .Distinct()
                             .OrderBy(c => c)
                             .ToList();

            ViewBag.ConfigType = new SelectList(typeList);

            return View(configs.OrderBy(c => c.ConfigKey).ToList());
        }


        // GET: Admin/SystemConfigs/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SystemConfig systemConfig = db.SystemConfigs.Find(id);
            if (systemConfig == null)
            {
                return HttpNotFound();
            }
            return View(systemConfig);
        }

        // GET: Admin/SystemConfigs/Create
        public ActionResult Create()
        {
            ViewBag.UpdatedBy = new SelectList(db.Employees, "EmployeeID", "FullName");
            return View();
        }

        // POST: Admin/SystemConfigs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,ConfigKey,ConfigValue,Description,ConfigType,UpdatedBy,CreatedAt")] SystemConfig systemConfig)
        {
            if (ModelState.IsValid)
            {
                db.SystemConfigs.Add(systemConfig);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.UpdatedBy = new SelectList(db.Employees, "EmployeeID", "FullName", systemConfig.UpdatedBy);
            return View(systemConfig);
        }

        // GET: Admin/SystemConfigs/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SystemConfig systemConfig = db.SystemConfigs.Find(id);
            if (systemConfig == null)
            {
                return HttpNotFound();
            }
            ViewBag.UpdatedBy = new SelectList(db.Employees, "EmployeeID", "FullName", systemConfig.UpdatedBy);
            return View(systemConfig);
        }

        // POST: Admin/SystemConfigs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,ConfigKey,ConfigValue,Description,ConfigType,UpdatedBy,CreatedAt")] SystemConfig systemConfig)
        {
            if (ModelState.IsValid)
            {
                db.Entry(systemConfig).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.UpdatedBy = new SelectList(db.Employees, "EmployeeID", "FullName", systemConfig.UpdatedBy);
            return View(systemConfig);
        }

        // GET: Admin/SystemConfigs/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SystemConfig systemConfig = db.SystemConfigs.Find(id);
            if (systemConfig == null)
            {
                return HttpNotFound();
            }
            return View(systemConfig);
        }

        // POST: Admin/SystemConfigs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            SystemConfig systemConfig = db.SystemConfigs.Find(id);
            db.SystemConfigs.Remove(systemConfig);
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
