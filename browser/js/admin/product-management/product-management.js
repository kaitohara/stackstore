app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('admin.products', {
		url: '/products',
		templateUrl: 'js/admin/product-management/product-management.html',
		controller: 'AdminProductCtrl',
		resolve: {
			songs: function($http) {
				return $http.get('/api/songs/populated')
					.then(function(res) {
						return res.data;
					});
			},
			albums: function($http) {
				return $http.get('/api/albums/populated')
					.then(function(res) {
						return res.data;
					});
			}
		}
	});
}]);

app.controller('AdminProductCtrl', ['$scope', 'songs', 'albums', 'AdminFactory', function($scope, songs, albums, AdminFactory){
	$scope.songs = songs;
	$scope.albums = albums;
	$scope.newSong = null;
	$scope.newAlbum = null;
	$scope.creatingProduct = false;
	$scope.creatingCategory = false;
	$scope.toggleCreateProduct = function() {
		if ($scope.creatingCategory) {
			$scope.creatingCategory = false;
		}
		$scope.creatingProduct = !$scope.creatingProduct;
	};
	$scope.toggleCreateCategory = function() {
		if ($scope.creatingProduct) {
			$scope.creatingProduct = false;
		}
		$scope.creatingCategory = !$scope.creatingCategory;
	};

	$scope.submitCategory = function(data) {
		console.log('making category', data);
		AdminFactory.createCategory(data)
			.then(cat => console.log('successful', cat));
	};

	$scope.submitSong = function(data) {
		AdminFactory.createSong(data)
			.then(song => {
				console.log('success', song);
				$scope.songs.push(song);
			});
	};

	$scope.submitAlbum = function(data) {
		console.log('submitting album', data);
		AdminFactory.createAlbum(data)
			.then(res => {
				$scope.albums.push({title: 'jack made this', artist: 'jack', year: '1994', songs: [1]});
				$scope.newAlbum = {};
				return res.data;
			});
	};

	$scope.deleteSong = function(song) {
		console.log('deleting this song', song);
		AdminFactory.deleteSong(song._id)
			.then(() => {
				_.remove(songs, s => s._id === song._id);
			});
	};

	$scope.updateSong = function(song, config) {
		AdminFactory.updateSong(song._id, config)
			.then(res => console.log('the update res', res));
	};

	$scope.deleteAlbum = function(album) {
		AdminFactory.deleteAlbum(album._id)
			.then(() => {
				_.remove(albums, al => al._id === album._id);
				// delete all songs from that album too
				_.remove(songs, s => _.includes(album.songs, s._id));
				return AdminFactory.deleteSongs(album.songs);
			})
			.then(res => {
				console.log('you did it', res);
			});
	};

	$scope.updateAlbum = function(album, config) {
		AdminFactory.deleteAlbum(album._id, config)
			.then(res => console.log('the update res', res));
	};

}]);