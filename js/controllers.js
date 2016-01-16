app
    .controller('AddressesCtrl', ['$scope', 'MapRestService', '$window', '$state', 'AddressesService', function ($scope, MapRestService, $window, $state, AddressesService) {

        // Show loading spinner.
        $scope.loading = true;

        //// get list of items based on current location
        navigator.geolocation.getCurrentPosition(function (position) {
            MapRestService.getList(position.coords.latitude, position.coords.longitude)
	            .then(function(addressesList){
		            $scope.addresses = AddressesService.aggByAddress(addressesList.data);
                    $scope.loading = false;
	            });
        }, function (error) {
            alert("impossible de vous localiser ");
            $scope.loading = false;
            console.log(error);
        });


    }])

    .controller('MapCtrl', ['$scope', 'MapRestService', '$stateParams', function ($scope, MapRestService, $stateParams) {

        $scope.map = MapRestService.showMap($stateParams.id);

    }])

    .controller('AddMapCtrl', ['$scope', 'MapRestService', '$stateParams', function ($scope, MapRestService, $stateParams) {

        $scope.addMap = function(map) {
            MapRestService.addMap($stateParams.id, map);
        }

    }]);