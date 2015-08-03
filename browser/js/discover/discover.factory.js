app.factory('DiscoverFactory', ['$http', function($http){
	var fact = {};

	fact.getStores = function() {
		return $http.get('/api/stores')
			.then(res => res.data);
	};

	fact.getStoreByUrl = function(url) {
		return $http.get('/api/stores/url/' + url)
			.then(res => res.data);
	};

	return fact;
}]);