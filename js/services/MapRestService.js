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
        return [
            {
                "id": 1,
                "address_label": "17 rue des champs, 75001 Paris",
                maps: [
                    {
	                    "id":11,
	                    "level": 2,
                        "building": "A",
                    },
                    {
	                    "id":12,
                        "level": 3,
                        "building": "A",
                    }
                ]
            },
            {
                "id": 2,
                "address_label": "18 rue des champs, 75001 Paris",
                "maps": [
                    {
	                    "id":21,
                        "address": "32 rue Bessière, 75017 Paris",
                        "building": "B2"
                    }
                ]
            },
            {
                "id": 3,
                "address_label": "19 rue des champs, 75001 Paris"
            },
            {
                "id": 4,
                "address_label": "20 rue des champs, 75001 Paris"
            },
            {
                "id": 5,
                "address_label": "21 rue des champs, 75001 Paris"
            }
        ];
        //return $http({
        //    method: 'GET',
        //    url: baseUrl + 'maps-info',
        //    data: {lat:lat, lng:lng}
        //});
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
            data: {addressId: addressId, data:data }
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