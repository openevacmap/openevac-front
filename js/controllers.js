app
    .controller('AddressesCtrl', ['$scope', 'MapRestService', '$window', '$state', 'AddressesService', function ($scope, MapRestService, $window, $state, AddressesService) {

        $scope.goToAddMapForm = function(id) {
            $state.go('addMap', {id: id});
        };

        //// get list of items based on current location
        navigator.geolocation.getCurrentPosition(function (position) {
            MapRestService.getList(position.coords.latitude, position.coords.longitude)
	            .then(function(addressesList){
		            $scope.addresses = AddressesService.aggByAddress(addressesList.data);
		            console.log($scope.addresses);
	            });
        }, function (error) {
            alert("impossible de vous localiser ");
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