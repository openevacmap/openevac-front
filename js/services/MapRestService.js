'use strict';

app.factory('MapRestService', ['$http', function ($http) {

    // var baseUrl = "http://api.openevacmap.org/v0/";
    var baseUrl = "http://10.18.182.204:8000/v0/";


    return {
        getList: getList,
        addMap: addMap,
        showMap: showMap,
        getBaseUrl : getBaseUrl
    };

    function getList(lat, lng) {
        return $http({
	        'Access-Control-Allow-Origin': '*',
            'method': 'GET',
            'url': baseUrl + 'maps-info?lat='+ lat + '&lon=' + lng
        });
    }

    function showMap(id) {
        return $http({
            method: 'GET',
            url: baseUrl + 'map?id=' + id
        });
    }

    function addMap(addressId, data, myPosition) {
        return $http({
            method: 'PATCH',
            url: baseUrl + 'addresses/' + addressId,
            data: _.extend(data, myPosition.coords)
        });
    }

    function reportMap(id) {
        return $http({
            method: 'PUT',
            url: baseUrl + 'alert-map/' + id
        });
    }

    function getBaseUrl() {
        return baseUrl;
    }
}]);