app
    .controller('MapsCtrl', ['$scope', 'MapRestService', function ($scope, MapRestService) {

        // TODO : geolocation

        $scope.addresses = MapRestService.getList();

    }])

    .controller('MapCtrl', ['$scope', 'MapRestService', '$stateParams', function ($scope, MapRestService, $stateParams) {

        $scope.map = MapRestService.showMap($stateParams.id);

        $scope.reportMap = function() {
            MapRestService.reportMap($stateParams.id);
        }

    }]);