if (!sabio.services.addresses)
    sabio.services.addresses = {}


// Update address by id
sabio.services.addresses.updateAddress = function (payload, addressId, onSucces, onError) {

    $.ajax({
        type: 'PUT',
        url: '/api/address/' + addressId,
        dataType: "json",
        data: payload,
        success: onSucces,
        error:onError

    });
};

// Create a new Address Ajax 
sabio.services.addresses.createAddress = function (payload, onSucces, onError) {

    $.ajax({
        type: 'POST',
        url: '/api/address/',
        dataType: "json",
        data: payload,
        success: onSucces,
        error: onError

    });
};


// Populate form by id Ajax call
sabio.services.addresses.populateById = function (addressId, onSuccess, onError) {
    $.ajax({
        type: 'GET',
        url: "/api/address/" + addressId,
        dataType: "json",
        success: onSuccess,
        error:onError

    });
};

// Populate current user address
sabio.services.addresses.populateByCurrentUser = function (onSuccess, onError) {
    $.ajax({
        type: 'GET',
        url: "/api/address/currentUser",
        dataType: "json",
        success: onSuccess,
        error: onError

    });
};


// List all addresses Ajax call
sabio.services.addresses.listAllAddresses = function (onSuccess, onError) {
$.ajax({

    type: 'GET',
    url: '/api/address',
    dataType: 'json',
    success: onSuccess,
    error: onError

    });
}


// Delete by Id Ajax call
sabio.services.addresses.deleteAddressById = function (addressid, onSuccess, onError) {
    $.ajax({
        type: 'DELETE',
        url: '/api/address/' + addressid,
        success: onSuccess,
        error: onError

    });
}

