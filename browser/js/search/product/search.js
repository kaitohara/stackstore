app.config(function ($stateProvider) {
	$stateProvider.state('search', {
		url: '/search',
		controller: 'SearchCtrl',
		templateUrl: 'js/search/product/search.html'
	});
});

// app.service('Search', function(){
// 	var search = this;
// 	search.term = 'bla'; 
// 	// return {
// 	// 	searchTerm: '',
// 	// 	update:function(value){
// 	// 		this.searchTerm = value;
// 	// 		console.log('in factory', this.searchTerm)
// 	// 	}
// 	// }
// })

// app.factory('SearchService', function(){
// 	var searchTerm = '';
// 	//register an observer
// 	this.registerObserverCallback = function(callback){
// 		observerCallbacks.push(callback);
// 	}
// 	//call this when you know search Term has been changed
// 	var notifyObservers = function(){
// 		angular.forEach(observerCallbacks, function(callback){
// 			callback();
// 		});
// 	};

// })

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