(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('addressController', addressController);

    addressController.$inject = ['$scope', '$baseController', '$AddressesService'];

    function addressController(
       $scope
       , $baseController
       , $AddressesService) {

        var vm = this;//this points to a new {}
        vm.items = null;


        vm.$AddressesService = $AddressesService;
        vm.$scope = $scope;

        //-- this line to simulate inheritance
        $baseController.merge(vm, $baseController);

        //this is a wrapper for our small dependency on $scope
        vm.notify = vm.$AddressesService.getNotifier($scope);

        //this is like the sabio.startUp function
        render();

        // Delete Address Button
        vm.deleteAddressById = _deleteAddressById;

        //Call to List All Addresses Ajax
        function render() {
            vm.$AddressesService.listAllAddresses(_listAllAddressesSuccess, _listAllAddressesError);
        }

        //Address List Success Message - And more! :-)
        function _listAllAddressesSuccess(data) {
            //this receives the data and calls the special
            //notify method that will trigger ng to refresh UI
            vm.notify(function () {
                vm.items = data.items;
                console.log('my items', vm.items);
            });
        }

        //Address List Fail Message
        function _listAllAddressesError() {
            console.log("Address List Failed");
        }

        //Call to Delete Ajax
        function _deleteAddressById(addressId) {
            console.log('address deleted', addressId);

            vm.$AddressesService.deleteAddressById(addressId, _deleteAddressSuccess, _deleteAddressFail);
        }

        //Delete Fail Message
        function _deleteAddressFail() {
            console.log('delete fail')
        }
        //Delete Success Message
        function _deleteAddressSuccess() {
            console.log("delete success");
            vm.$alertService.success();
            render();
        }
    }
})();