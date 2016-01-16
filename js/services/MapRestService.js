'use strict';

app.factory('MapRestService', ['$http', function ($http) {

    var baseUrl = "http://api.openevacmap.org/v0/";

    return {
        getList: getList,
        updateMap: updateMap,
        showMap: showMap
    };

    function getList(lat, lng) {
        return [
            {
                "id": 1,
	            "address": "32 rue de la poste, 75017 Paris",
                maps: [
                    {
	                    "id":11,

	                    "desc": "Plan de la cafét de 42",
	                    "level": 2,
                        "building": "A",
                        "path": "http://www.precisionfloorplan.com/wp-content/uploads/2008/08/emergency-evac-chart-img.jpg"
                    },
                    {
	                    "id":12,
                        "level": 3,
                        "building": "A",
                        "path": "http://sydney.edu.au/whs/images/a19%20image%20reduced%20size.jpg"
                    }
                ]
            },
            {
                "id": 2,
                "desc": "Plan de la cafét de 42",
                "level": 1,
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
                "desc": "Plan de la cafét de 42",
                "level": 2,
                "address": "33 rue Bessière, 75017 Paris",
                "building": "B2"
            },
            {
                "id": 4,
                "desc": "Plan de la cafét de 42",
                "level": 2,
                "address": "34 rue de la poste, 75017 Paris",
                "building": "B2"
            },
            {
                "id": 5,
                "desc": "Plan de la salle de réunion",
                "level": 3,
                "address": "35 bd le général leclerc, 31017 Paris",
                "building": "A"
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
            date: '12/12/2015 15:00'
        };
        //return $http({
        //    method: 'GET',
        //    url: baseUrl + 'maps/' + id
        //});
    }

    function updateMap(id, data) {
        return $http({
            method: 'PUT',
            url: baseUrl + 'maps/' + id,
            data: data
        });
    }

    function reportMap(id) {
        return $http({
            method: 'PUT',
            url: baseUrl + 'alert-map/' + id
        });
    }
}]);