// Route Configuration
(function () {
    "use strict";

    angular.module(APPNAME)
        .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {

            $routeProvider.when('/edit/:addressId', {
                templateUrl: '/Scripts/sabio/application/addresses/templates/Index.html',
                controller: 'addressCreateEditController',
                controllerAs: 'createEditAddress'
            }).when('/create/', {
                templateUrl: '/Scripts/sabio/application/addresses/templates/Index.html',
                controller: 'addressCreateEditController',
                controllerAs: 'createEditAddress'
            });

            $locationProvider.html5Mode(false);

        }]);

})();
