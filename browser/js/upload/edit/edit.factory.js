app.factory('EditFactory', ['$http', function($http){
	var fact = {};

	fact.currentAlbum = {};
	fact.currentSong = {};

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
		return $http.get('/api/stores/' + id)
			.then(res => res.data);
	};

	// get a populated store
	fact.getStorePopulated = function(id) {
		return $http.get('/api/stores/' + id + '/populated')
			.then(res => res.data);
	};

	fact.addAlbum = function(albumData) {

	};

	fact.addSong = function(songData) {

	};

	return fact;
}]);