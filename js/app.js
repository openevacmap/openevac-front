var app = angular.module('openEvacMap', ['ui.router', 'ngFileUpload']);

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    // remove URL hashtag : WARNING -> the app must be at the root directory of the domain
    // if not, change the base href attribute in <head>
    $locationProvider.html5Mode(true).hashPrefix('!');

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

