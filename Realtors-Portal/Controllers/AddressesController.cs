using System.Linq;
using System.Web.Mvc;
using Realtors_Portal.Models;

namespace Realtors_Portal.Controllers
{
    public class AddressesController : Controller
    {
        private RealtorsPortalEntities db = new RealtorsPortalEntities();

        //Get by WardID
        public JsonResult GetByWardID(int WardID)
        {
            var results = db.Addresses
                .Where(a => a.WardID == WardID)
                .Select(a => new {
                    a.AddressID,
                    a.Street
                })
                .ToList();
            return Json(results, JsonRequestBehavior.AllowGet);
        }
    }
}
