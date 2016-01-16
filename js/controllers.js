var myPosition = {
    coords: {
        lat: null,
        lon: null
    }
};

app
    .controller('AddressesCtrl', ['$scope', 'MapRestService', '$window', '$state', 'AddressesService', function ($scope, MapRestService, $window, $state, AddressesService) {

        // Show loading spinner.
        $scope.loading = true;

        //// get list of items based on current location
        navigator.geolocation.getCurrentPosition(function (position) {

            myPosition.coords.lat = position.coords.latitude;
            myPosition.coords.lon = position.coords.longitude;

            MapRestService.getList(myPosition.coords.lat, myPosition.coords.lon)
                .then(function (addressesList) {
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

        MapRestService.showMap($stateParams.id)
            .then(function (map) {
                $scope.map = map.config.url;
            }, function (map) {
                alert('Error, Plan non retrouvé');
            });

    }])

    .controller('AddMapCtrl', ['$scope', 'MapRestService', '$stateParams', '$sce', function ($scope, MapRestService, $stateParams, $sce) {

        $scope.actionUrl = $sce.trustAsResourceUrl(MapRestService.getBaseUrl() + 'addresses/' + $stateParams.id);

        if (!myPosition.coords.lat || !myPosition.coords.lon) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.lat = position.coords.latitude;
                $scope.lon = position.coords.longitude;
            });
        }
        else {
            $scope.lat = myPosition.coords.lat;
            $scope.lon = myPosition.coords.lon;
        }

        //if(!myPosition.coords.lat || !myPosition.coords.lon){
        //	navigator.geolocation.getCurrentPosition(function (position) {
        //
        //		myPosition.coords.lat = position.coords.latitude;
        //		myPosition.coords.lon = position.coords.longitude;
        //
        //		$scope.addMap = function(map) {
        //			MapRestService.addMap($stateParams.id, map, myPosition);
        //		}
        //
        //	}, function (error) {
        //		alert("impossible de vous localiser ");
        //		$scope.loading = false;
        //		console.log(error);
        //	});
        //}
        //else{
        //	$scope.addMap = function(map) {
        //		MapRestService.addMap($stateParams.id, map, myPosition);
        //	}
        //}
    }]);