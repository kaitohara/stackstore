app.config(function ($stateProvider) {
	$stateProvider.state('search', {
		url: '/search/:searchParam',
		controller: 'SearchCtrl',
		templateUrl: 'js/search/product/search.html'
	});
});

//custom filter that allows 'OR' search with multiple keywords
app.filter('searchFilter', function ($filter){
	return function(items, search){
		//split search terms by word 
		var searchTerms = search.split(' ');
		//apply filter on array for each search word
		searchTerms.forEach(function(term){
			if (term && term.length){
				items = $filter('filter')(items, term)
			}
		})
		return items;
	}
})

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
