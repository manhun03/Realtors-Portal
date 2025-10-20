using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Realtors_Portal.Models;

namespace Realtors_Portal.Controllers
{
    public class DistrictsController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        //Get by CityID
        public JsonResult GetByCityID(int CityID)
        {
            var results = db.Districts
                .Where(d => d.CityID == CityID && d.IsActive == true)
                .Select(d => new {
                    d.DistrictID,
                    d.DistrictName
                })
                .ToList();
            return Json( results, JsonRequestBehavior.AllowGet );

        }
    }
}
