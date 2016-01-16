app
    .controller('AddressesCtrl', ['$scope', 'MapRestService', '$window', '$state', function ($scope, MapRestService, $window, $state) {

        $scope.addresses = MapRestService.getList();

        $scope.goToAddMapForm = function(id) {
            $state.go('addMap', {id: id});
        };

        //// get list of items based on current location
        //$window.navigator.geolocation.getCurrentPosition(function (position) {
        //    $scope.addresses = MapRestService.getList(position.coords.latitude, position.coords.longitude);
        //}, function (error) {
        //    alert("impossible de vous localiser ");
        //    console.log(error);
        //});

    }])

    .controller('MapCtrl', ['$scope', 'MapRestService', '$stateParams', function ($scope, MapRestService, $stateParams) {

        $scope.map = MapRestService.showMap($stateParams.id);

    }])

    .controller('AddMapCtrl', ['$scope', 'MapRestService', '$stateParams', function ($scope, MapRestService, $stateParams) {

        $scope.addMap = function(map) {
            MapRestService.addMap($stateParams.id, map);
        }

    }]);