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

}]);