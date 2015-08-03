app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover.stores.album.default', {
		url: '/default',
		templateUrl: 'js/discover/stores/album-view/default/default-album-view.html',
		controller: 'AlbumViewDefaultCtrl'
	});
}]);

app.controller('AlbumViewDefaultCtrl', ['$scope', '$state', function($scope, $state){
	$scope.goToSong = function(song) {
		$state.go('discover.stores.album.song', {songId: song._id});
	};
}]);