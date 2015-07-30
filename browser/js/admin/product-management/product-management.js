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
				return $http.get('/api/albums')
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
	$scope.submit = function(type, data) {
		console.log(type, data);
		if (type === 'category') {
			// submit category
			AdminFactory.createCategory(data)
				.then(function(cat) {
					console.log('successful', cat);
				});
		} else if (type === 'song'){
			// submit song
			AdminFactory.createSong(data)
				.then(function(song) {
					console.log('successful', song);
					$scope.songs.push(song);
				});
		} else if (type === 'album'){
			// submit album
			// AdminFactory.createAlbum(data)
			// 	.then(function(album) {
			// 		console.log('successful', album);
			// 		$scope.albums.push(album);
			// 	});
			$scope.albums.push({title: 'jack made this', artist: 'jack', year: '1994', songs: [1]});
			$scope.newAlbum = {};
		}
	};

}]);