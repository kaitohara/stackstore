app.factory('FormFactory', ['$http', function($http){
	var fact = {};

	fact.getGenres = function() {
		return $http.get('/api/genres')
			.then(res => res.data);
	};

	fact.getArtists = function() {
		return $http.get('/api/artists')
			.then(res => res.data);
	};

	fact.getAlbums = function() {
		return $http.get('/api/albums')
			.then(res => res.data);
	};

	return fact;
}]);