
// Controller Setup
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('addressCreateEditController', addressCreateEditController);

    addressCreateEditController.$inject = ['$scope', '$baseController', "$AddressesService"];

    function addressCreateEditController(
        $scope
        , $baseController
        , $AddressesService) {


        var vm = this;// this points to a new {}
        vm.headingInfo = "Angular 101";
        vm.addressId = $("#addressId").val();

        //for google maps Geo Coding
        vm.geocoder = null;
        vm.map = null;
        vm.geocodeResponse = null;
        vm.marker = null;
           
        vm.overLays = null;


        vm.items = null;
        vm.selectedAddress = null;
        vm.newAddress = null;
        vm.addressForm = null;
        vm.addressFormVisible = false;
        vm.showNewAddressErrors = false;
        vm.activateSaveBtn = true; // disabling of the save address btn on start up - until the form is validated via Geo coding

        vm.$AddressesService = $AddressesService;
        vm.$scope = $scope;


         
        vm.receiveItems = _receiveItems;
        vm.onEmpError = _onEmpError;
        vm.selectAddress = _selectAddress;
        vm.saveStatus = _saveStatus;
        vm.showAddressForm = _showAddressForm;
        vm.addAddress = _addAddress;
        vm.echoAddress = _echoAddress;
        vm.resetAddressForm = _resetAddressForm;
        vm.submitAddressForm = _submitAddressForm; // used and binded to the save address button in HTML
        vm.checkAddressGeo = _checkAddressGeo;



    
        $baseController.merge(vm, $baseController);

        vm.notify = vm.$AddressesService.getNotifier($scope);

        //init
        render();

        // If Id is present, populate the form with that address
        function render() {

            vm.map = new google.maps.Map($('#googleMap')[0], {
                zoom: 10,
                center: { lat: 34.0522, lng: -118.2437 }
            });

            vm.marker = new google.maps.Marker({
                position: { lat: 34.0522, lng: -118.2437 },
                map: vm.map
            });

            
            vm.geocoder = new google.maps.Geocoder();

            // if the Id is present and its greater than 0, run the Ajax to populate the form
            if (vm.addressId && vm.addressId.length > 0) {
                console.log("EDIT mode - go get the data");

                // Address form populate by Id Ajax
                vm.$AddressesService.populateById(vm.addressId, _addressPopulateByIdSuccess, _addressPopulateByIdError);

            }
            else {
                //Console log that there is no Id and nothing to populte the form with
                console.log("CREATE mode - jobGuid is empty");
            }
        }

        // Assigning/Sedning the new address from the user input/form to "addString" variable then shipping over to the Geocode address validation
        function _checkAddressGeo() {

            if (vm.addressForm.$valid) {

              
                var addressString = vm.newAddress.line + " " + vm.newAddress.lineTwo + " " + vm.newAddress.city + " " + vm.newAddress.stateId + " " + vm.newAddress.zipCode;
                _codeAddress(addressString);
                console.log('this is the code string:', addressString);
            }
            else {
                vm.showNewAddressErrors = true;
                console.log("form submitted with invalid data :(")
            }

        }

        //Assigning the addressString varibale to the Geo Coder function and starting the process to validate the address
        function _codeAddress(address) { 
            console.log("address string -> ", address);

            vm.geocoder.geocode({ 'address': address }, _onCodeAddress);
        }

        // Google Geo coder gets the address and does the validation process for us
        function _onCodeAddress(results, status) {
            vm.notify(function () {
                vm.geocodeResponse = JSON.stringify(results, null, "     ");
            });

            if (status == google.maps.GeocoderStatus.OK) {

                var geometry = results[0].geometry;
                var loc = geometry.location;

                console.log("got location data from API", loc);

                vm.map.setCenter(loc);


                vm.marker = new google.maps.Marker({
                    map: vm.map,
                    position: loc
                });


                if (geometry.viewport)
                    vm.map.fitBounds(geometry.viewport);

                var lat = loc.lat();
                var lon = loc.lng();

                console.log("found coordinates in reply -> (%s, %s)", lat, lon); //console log

                vm.newAddress.latitude = lat;
                vm.newAddress.longitude = lon;

                _submitAddressForm;

                // Activation of the save addres btn once the validation comes back as "valid"
                vm.notify(function () {
                    vm.activateSaveBtn = false;
                });
                        

            } else {
                alert('We could not find the address. Please check your information and try again. : ' + status);
            }
        }


        // The Populte form by Id Ajax call Sunccess, passing the date to the vm.newAddress and pushed into the form
        function _addressPopulateByIdSuccess(data) {  

            vm.notify(function () {
                vm.newAddress = data.item;

            });

            var lat = data.item.latitude;
            var lng = data.item.longitude;
            var newLatLng = new google.maps.LatLng(lat, lng);
            vm.marker.setPosition(newLatLng);
            vm.map.setCenter(newLatLng);
         
            // Console log the data being passed into the HTML form for population byt Id
            console.log('Populate by Id worked', data);

        }
                
        // Failed update by Id Ajax
        function _addressPopulateByIdError() {
            console.log('Populate by Id failed');
        }
                
        // Call Update Address bu Id or Create Address function if the form has been populated by the address from the Manage page by the Edit button
        function _submitAddressForm(data) {

            console.log('adddress Id for update ', vm.addressId)
            if (vm.addressId && vm.addressId.length > 0) {


                // Ajax call for Address Update service ajax refactoring
                vm.$AddressesService.updateAddress(vm.newAddress, vm.addressId, _addressUpdateSuccess, _addressUpdateError);

            }
                // Ajax call for Creating of a new Address
            else {
                //  Ajax address creation service ajax refactoring
                vm.$AddressesService.createAddress(vm.newAddress, _createAddressSucccess, _createAddressfail)

            }

            console.log('payload:', vm.newAddress);
        }

        // Ajax call to create access success + window location change on success to mange page
        function _createAddressSucccess(event) {
            console.log('Address Create Success', vm.newAddress);
            window.location.href = "/address/manage/";  // Sending the user back to the Manage user page
        }

        // Ajax create new address fail message
        function _createAddressfail(event) {
            console.log('Address creation fail');
        }

        // Ajax address update success message
        function _addressUpdateSuccess(event) {
            console.log('Address created!', vm.newAddress)
            window.location.href = "/address/manage/";
        }

        // Ajax address update fail message
        function _addressUpdateError(event) {
            console.log('Update Address Fail');
        }


        function _receiveItems(data) {
            //this receives the data and calls the special
            //notify method that will trigger ng to refresh UI
            vm.notify(function () {
                vm.items = data.items;
            });
        }
       
        function _resetAddressForm() {
            console.log("reset form");
            vm.addressFormVisible = false;
            vm.showNewAddressErrors = false;
            vm.newAddress = null;
            vm.addressForm.$setPristine();
            vm.addressForm.$setUntouched()
        }

        // Address form visible on startup
        function _showAddressForm() {
            console.log("show form!");
            vm.AddressFormVisible = !vm.AddressFormVisible;
        }

        function _addAddress() {
            vm.showNewAddressErrors = true;

            if (vm.addressForm.$valid) {
                console.log("data is valid! go save this object -> ", vm.newAddress);
            }
            else {
                console.log("form submitted with invalid data :(")
            }
        }

        //call to Ajax to create address
        function _addAddress() {
            console.log(vm.newAddress);
            vm.$AddressesService.createAddress(vm.newAddress, _createAddressSucccess, _createAddressfail)

        }

        function _echoAddress() {
            console.log("ECHO Address -> ", vm.newAddress);
        }

        function _selectAddress(anEmp) {
            console.log(anEmp);
            vm.selectedAddress = anEmp;
        }

        function _saveStatus(anEmp) {
            console.log("Go and save this new data");
            console.log(anEmp);
        }

        function _onEmpError(jqXhr, error) {
            console.error(error);
        }
    }
})();
