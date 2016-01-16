var app = angular.module('openEvacMap', ['ui.router']);

app.config(function($stateProvider) {

    $stateProvider
        .state('addresses', {
            url: "/",
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
        })
});
