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
	$scope.allResults = [];
	$scope.searchResults = [];

	artists.getArtists().then(function(data){
		$scope.artists = data;
		$scope.allResults.push(data)
	});

	albums.getAlbums().then(function(data){
		$scope.albums = data;
		$scope.allResults.push(data)
	})

	songs.getSongs().then(function(data){
		$scope.songs = data;
		$scope.allResults.push(data)
	})


	

    	// for(var i = 0; i < $scope.results.length; i++){
     //    	var artist = $scope.results.name;
     //    	var album =
     //    	if($scope.results[i].indexOf(str) != -1){
     //    		$scope.searchResults.push($scope.results[i]);
     //    	}
    	// }
    

    
})
