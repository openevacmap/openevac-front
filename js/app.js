var app = angular.module('openEvacMap', ['ui.router']);


app.config(['$stateProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider',
	function($stateProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {

		$locationProvider.html5Mode(true).hashPrefix('!');

        // WARNING : DEMO ONLY not secure
        $sceDelegateProvider.resourceUrlWhitelist(['*', 'self']);

    $stateProvider
        .state('thanks', {
            url: "/thanks",
            templateUrl: "templates/thanks.html"
        })
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

