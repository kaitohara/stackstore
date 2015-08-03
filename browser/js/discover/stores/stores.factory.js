app.factory('StoresFactory', ['$http', function($http){
	var fact = {};

	fact.currentAlbum = {};
	fact.currentSong = {};
	fact.currentStore = {};

	// get an album
	fact.getAlbum = function(id) {
		return $http.get('/api/albums/' + id)
			.then(res => {
				console.log('got this album', res.data);
				_.extend(fact.currentAlbum, res.data);
				console.log('currentAlbum', fact.currentAlbum);
				return res.data;
			});
	};

	// get a store
	fact.getSong = function(id) {
		return $http.get('/api/songs/' + id)
			.then(res => {
				fact.currentSong = res.data;
				return res.data;
			});
	};

	// get a store
	fact.getStore = function(id) {
		if (id) {
			return $http.get('/api/stores/' + id)
				.then(res => res.data);
		} else {
			return null;
		}
	};

	// get a populated store
	fact.getStorePopulated = function(id) {
		return $http.get('/api/stores/' + id + '/populated')
			.then(res => {
				fact.currentStore = res.data;
				return fact.currentStore;
			});
	};

	fact.getGenreByName = function(name) {
		return $http.get('/api/genres/' + name)
			.then(res => res.data);
	};

	return fact;
}]);