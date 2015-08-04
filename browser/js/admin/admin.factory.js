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

	return fact;
}]);