using System.Data;
using System.Linq;
using System.Web.Mvc;
using Realtors_Portal.Models;

namespace Realtors_Portal.Controllers
{
    public class WardsController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        //Get by DistrictID
        public JsonResult GetByDistrictID(int DistrictID)
        {
            var results = db.Wards
                .Where(d => d.DistrictID == DistrictID && d.IsActive == true)
                .Select(d => new {
                    d.WardID,
                    d.WardName
                })
                .ToList();
            return Json(results, JsonRequestBehavior.AllowGet);

        }

    }
}
