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
						label : val[0].address_label
					}
				})
				.value();
	}
}]);