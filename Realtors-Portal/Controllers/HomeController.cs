using Realtors_Portal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace Realtors_Portal.Controllers
{
    public class HomeController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();
        public ActionResult Index()
        {
            //var properties = db.Properties
            //    .Include(p => p.Address.City)
            //    .Include(p => p.Address.District)
            //    .Include(p => p.Address.Ward)
            //    .Include(p => p.PropertyImages)
            //    .OrderByDescending(p => p.CreatedAt)
            //    .Take(12)
            //    .ToList();

            //return View(properties);
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Trangchu()
        {
            

            return View();
        }
    }
}