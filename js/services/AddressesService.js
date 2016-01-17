'use strict';

app.factory('AddressesService', ['$http', function ($http) {
	return {
		aggByAddress: aggByAddress
	}

	function aggByAddress(allMaps){
		return _.chain(allMaps)
				.groupBy('address')
				.map(function(val, key){
					return {
						id : key,
						maps : val,
						label : val[0].address_label,
						dist : (_.minBy(val, function(map){return map.dist})).dist,
						nbrMaps : _.filter(val, function(map) {
							return map.id;
						})
					}
				})
				.orderBy(function(adr){
					return adr.dist;
				}, 'asc')
				.value();
	}
}]);