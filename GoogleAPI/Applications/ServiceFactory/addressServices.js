(function () {
    "use strict";

    angular.module(APPNAME)
        .factory('$AddressesService', addressesServiceFactory);

    addressesServiceFactory.$inject = ['$baseService', '$sabio'];

    function addressesServiceFactory($baseService, $sabio) {

        var aSabioServiceObject = sabio.services.addresses;
        var newService = $baseService.merge(true, {}, aSabioServiceObject, $baseService);

        console.log('addresses list:', aSabioServiceObject)
        return newService;
    }
})();

