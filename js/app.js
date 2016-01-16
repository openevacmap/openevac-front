var app = angular.module('openEvacMap', ['ui.router']);

app.config(function($stateProvider) {

    $stateProvider
        .state('maps', {
            url: "/",
            templateUrl: "templates/maps/list.html",
            controller: 'MapsCtrl'
        })
        .state('map', {
            url: "/maps/{id}",
            templateUrl: "templates/maps/show.html",
            controller: 'MapCtrl'
        })
});
