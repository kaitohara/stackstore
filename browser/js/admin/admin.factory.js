app.factory('AdminFactory', ['$http', function($http){
	var fact = {};

	fact.getSongsWithAlbums = function() {
		return $http.get('/api/songs/albums')
			.then(function(res) {
				return res.data;
			});
	};

	fact.createSong = function(config) {
		return $http.post('/api/songs', config)
			.then(function(res) {
				return res.data;
			});
	};

	fact.createAlbum = function(config) {
		return $http.post('/api/albums', config)
			.then(function(res) {
				return res.data;
			});
	};

	fact.createCategory = function(config) {
		return $http.post('/api/genres', config)
			.then(function(res) {
				return res.data;
			});
	};

	fact.changeStatus = function(userId, status) {
		return $http.put('/api/users/' + userId, {isAdmin: status})
			.then(function(res) {
				return res.data;
			});
	};

	fact.changeSeller = function(userId, status) {
		return $http.put('/api/users/' + userId, {isSeller: status})
			.then(function(res) {
				return res.data;
			});
	};

	fact.deleteUser = (userId) => {
		return $http.delete('/api/users/' + userId)
			.then(res => res.data);
	};

	fact.resetPassword = (userId) => {
		return $http.put('/api/users/' + userId, {resetPassword: true})
			.then(res => res.data);
	};

	fact.changeOrderStatus = (orderId, status) => {
		return $http.put('/api/orders/' + orderId, {orderStatus: status})
			.then(res => res.data);
	};

	fact.deleteStore = (id) => {
		return $http.delete('/api/stores/' + id)
			.then(res => res.data);
	};

	fact.updateStore = (id, config) => {
		return $http.put('/api/stores/' + id, config)
			.then(res => res.data);
	};

	fact.deleteSong = (id) => {
		return $http.delete('/api/songs/' + id)
			.then(res => res.data);
	};

	fact.updateSong = (id, config) => {
		return $http.put('/api/songs/' + id, config)
			.then(res => res.data);
	};

	fact.deleteAlbum = (id) => {
		return $http.delete('/api/albums/' + id)
			.then(res => res.data);
	};

	fact.updateAlbum = (id, config) => {
		return $http.put('/api/albums/' + id, config)
			.then(res => res.data);
	};

	fact.deleteSongs = (songArr) => {
		// easier to send array with put
		return $http.put('/api/songs/multi', songArr)
			.then(res => res.data);
	};

	fact.getArtistByName = (name) => {
		return $http.get('/api/artists/name/' + name)
			.then(res => res.data);
	};

	fact.getAlbumByName = (name) => {
		return $http.get('/api/albums/name/' + name)
			.then(res => res.data);
	};

	fact.getGenreByName = function(name) {
		return $http.get('/api/genres/' + name)
			.then(res => res.data);
	};

	fact.getPopulatedSong = function(id) {
		return $http.get('/api/songs/' + id + '/populated')
			.then(res => res.data);
	};
	fact.getPopulatedAlbum = function(id) {
		return $http.get('/api/albums/' + id + '/populated')
			.then(res => res.data);
	};

	return fact;
}]);