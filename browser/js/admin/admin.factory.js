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

	return fact;
}]);