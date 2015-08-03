app.factory('FormFactory', ['$http', function($http){
	var fact = {};

	fact.getGenres = function() {
		return $http.get('/api/genres')
			.then(res => res.data);
	};

	return fact;
}]);