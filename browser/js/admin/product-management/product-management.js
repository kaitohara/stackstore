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
			.then(cat => $scope.creatingCategory = false);
	};

	$scope.submitSong = function(data) {
		console.log('making this song', data);

		var photo;
		var albumId;

		// find the album
		AdminFactory.getAlbumByName(data.album)
			.then(alb => {
				if (!alb) {
					// throw an error
				}
				data.album = alb._id;
				data.genre = alb.genre[0];
				photo = alb.photo;
				albumId = alb._id;
				return AdminFactory.createSong(data);
			})
			.then(song => {
				// add song to album
				// _.find($scope.albums, function(al) {return al._id === albumId});
				return AdminFactory.getPopulatedSong(song._id);
			})
			.then(ps => {
				console.log('made this song', ps);
				$scope.songs.push(ps);
				$scope.creatingProduct = false;
			});
	};

	$scope.submitAlbum = function(data) {

		// find the artists
		AdminFactory.getArtistByName(data.artist)
			.then(art => {
				if (art === 'not found') {
					// make a new artist and attach it
				}
				data.artist = art._id;
				// get genre
				return AdminFactory.getGenreByName(data.genre);
			})
			.then(gen => {
				data.genre = gen._id;
				// submit the album
				return AdminFactory.createAlbum(data);
			})
			.then(alb => {
				return AdminFactory.getPopulatedAlbum(alb._id);
			})
			.then(pa => {
				$scope.albums.push(pa);
				$scope.newAlbum = {};
				$scope.creatingProduct = false;
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