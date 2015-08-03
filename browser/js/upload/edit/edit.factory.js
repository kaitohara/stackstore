app.factory('EditFactory', ['$http', function($http){
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

	fact.createAlbum = function(albumData) {
		return $http.post('/api/albums', albumData)
			.then(res => res.data);
	};

	fact.deleteAlbum = function(albumId) {
		// remove from db
		return $http.delete('/api/albums/' + albumId)
			// remove from local store
			.then(res => {
				_.remove(fact.currentStore.albums, function(al) {return al._id === albumId});
				fact.currentAlbum = {};
				return res.data;
			});
		};

	fact.createSong = function(songData) {
		return $http.post('/api/songs', songData)
			.then(res => res.data);
	};

	fact.deleteSong = function(songId) {
		// delete from db
		return $http.delete('/api/songs/' + songId)
			.then(res => res.data);
	};

	fact.saveToAlbum = function(songId, album) {
		var songIds = album.songs.map(s => s._id);
		var config = {songs: songIds};
		return $http.put('/api/albums/' + album._id, config)
			.then(res => res.data);
	};

	return fact;
}]);