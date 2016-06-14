using Sabio.Web.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Web.Services.Interfaces
{
    public interface IAddressesService
    {

        int Insert(AddressAddRequestModel model);
        void Update(AddressAddRequestModel model, int addressId);
        Domain.Address GetAddressById(int id);
        List<Domain.Address> ListAddresses();
        void DeleteAddressById(int id);
        Domain.Address GetAddressByUserID(Guid UserId);

    }
}
