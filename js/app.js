var app = angular.module('openEvacMap', ['ui.router', 'ngFileUpload']);

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    // uncomment to remove hashtag from URL on production, and add <base href="/"> to the <head> section of index
    //$locationProvider.html5Mode(true).hashPrefix('!')

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

