using Sabio.Web.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sabio.Web.Controllers
{

    [RoutePrefix("address")]
    public class AddressController : BaseController
    {
        // GET: Address
        [Route("Create")]
        [Route("Edit/{addressId:int}")]
        public ActionResult Index_ng(int? addressId = null)
        {
            ItemViewModel<int?> vm = new ItemViewModel<int?>();
            vm.Item = addressId;
            return View(vm);
        }

        [Route("Manage")]
        public ActionResult Manage_ng()
        {
            return View();

        }
    }
}