app.config(function ($stateProvider) {
	$stateProvider.state('search', {
		url: '/search',
		controller: 'SearchCtrl',
		templateUrl: 'js/search/product/search.html'
	});
});

app.controller('SearchCtrl', function ($scope, artists, albums, songs){
	$scope.test = '123'
	$scope.artists;
	$scope.albums;

	artists.getArtists().then(function(data){
		$scope.artists = data;
	});

	albums.getAlbums().then(function(data){
		$scope.albums = data;
	})

	songs.getSongs().then(function(data){
		$scope.songs = data;
	})
	// $scope.getArtists = function(){
	// 	artists.getArtists().then(function(data){
	// 		$scope.artists = data;
	// 		console.log(data)
	// 	});
	// }


	// $scope.getartists = function(){
	// 	artists.getArtists().then(function(data){
	// 		$scope.artists = data;
	// 	});
	// }
	// $scope.artistSearch = new Artist();

})