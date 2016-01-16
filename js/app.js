var app = angular.module('openEvacMap', ['ui.router', 'ngFileUpload']);

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    
    $stateProvider
        .state('addresses', {
            url: "/{openedTab}",
            templateUrl: "templates/addresses/list.html",
            controller: 'AddressesCtrl'
        })
        .state('map', {
            url: "/maps/{id}",
            templateUrl: "templates/maps/show.html",
            controller: 'MapCtrl'
        })
        .state('addMap', {
            url: "/addresses/{id}/add-map",
            templateUrl: "templates/maps/add.html",
            controller: 'AddMapCtrl'
        });
}]);
