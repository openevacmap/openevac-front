'use strict';

app.factory('MapRestService', ['$http', function ($http) {

    var baseUrl = "http://api.openevacmap.org/v0/";

    return {
        getList: getList,
        addMap: addMap,
        showMap: showMap,
        getBaseUrl : getBaseUrl
    };

    function getList(lat, lng) {
        return $http({
            method: 'GET',
            url: baseUrl + 'maps-info?lat='+ lat + '&lon=' + lng
        });
    }

    function showMap(id) {
        return {
            path: 'http://www.precisionfloorplan.com/wp-content/uploads/2008/08/emergency-evac-chart-img.jpg',
            date: '12/12/2015 15:00',
	        building: 'A1',
	        level: '4ème'
        };
        //return $http({
        //    method: 'GET',
        //    url: baseUrl + 'maps?id=' + id
        //});
    }

    function addMap(addressId, data) {
        return $http({
            method: 'POST',
            url: baseUrl + 'addresses/' + addressId,
            data: {data:data }
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