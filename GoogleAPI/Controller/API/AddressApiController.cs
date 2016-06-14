using Sabio.Web.Controllers.Attributes;
using Sabio.Web.Domain;
using Sabio.Web.Models.Requests;
using Sabio.Web.Models.Requests.Addresses;
using Sabio.Web.Models.Responses;
using Sabio.Web.Services;
using Sabio.Web.Services.Addresses;
using Sabio.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{
    
    [RoutePrefix("api/address")]
    public class AddressApiController : ApiController
    {

        private IAddressesService _addressesService { get; set; }

        public AddressApiController(IAddressesService addressesService)
        {
            _addressesService = addressesService;
        }


        [Route(), HttpPost]
        public HttpResponseMessage CreateAddress(AddressAddRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            ItemResponse<int> response = new ItemResponse<int>();

            response.Item = _addressesService.Insert(model);

            return Request.CreateResponse(response);
        }

        // List all Adddresses on Startup
        [Route, HttpGet]
        public HttpResponseMessage ListAddresses(AddressAddRequestModel model)
        {

            ItemsResponse<Address> response = new ItemsResponse<Address>();

            response.Items = _addressesService.ListAddresses();

            return Request.CreateResponse(response);

        }


        // List Address by Id/Edit
        [Route("{addressId:int}"), HttpGet]
        public HttpResponseMessage GetAddressById(int addressId)
        {

            ItemResponse<Address> response = new ItemResponse<Address>();

            response.Item = _addressesService.GetAddressById(addressId);

            return Request.CreateResponse(response);
        }



        //Update Address
        [Route("{addressId:int}"), HttpPut]
        public HttpResponseMessage UpdateAddresses(AddressAddRequestModel model, int addressId)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            SuccessResponse response = new SuccessResponse();

            _addressesService.Update(model, addressId);

            return Request.CreateResponse(response);

        }

        //delelte 
        [Route("{addressId:int}"), HttpDelete]
        public HttpResponseMessage DeleteAddressById(int addressId)
        {
            SuccessResponse response = new SuccessResponse();

            _addressesService.DeleteAddressById(addressId);

            return Request.CreateResponse(response);
        }


        // List Address by current user
        [Route("currentUser"), HttpGet]
        [Authorize]
        public HttpResponseMessage GetAddressCurrentUser()
        {

            string userId = UserService.GetCurrentUserId();
            Guid myId = new Guid(userId);

            ItemResponse<Address> response = new ItemResponse<Address>();

            response.Item = _addressesService.GetAddressByUserID(myId);

            return Request.CreateResponse(response);
        }

        // List Address by current user
        [Route("currentDealer"), HttpGet]
        public HttpResponseMessage GetAddressCurrentDealer()
        {

            string userId = UserService.GetCurrentUserId();
            //string userId = "05e3a6c2-5610-40d0-adcf-5300517febd2";
            Guid userID = new Guid(userId);

            ItemsResponse<Address> response = new ItemsResponse<Address>();

            response.Items = _addressesService.GetAddressByCurrentDealer(userID);

            return Request.CreateResponse(response);
        }


    }
}





