app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover.stores.album.song', {
		url: '/song/:songId',
		templateUrl: 'js/discover/stores/album-view/song-view/song-view.html',
		controller: 'ViewSongCtrl',
		resolve: {
			song: function(StoresFactory, $stateParams) {
				return StoresFactory.getSong($stateParams.songId);
			},
			album: function(StoresFactory) {
				return StoresFactory.currentAlbum;
			}
		}
	});
}]);

app.controller('ViewSongCtrl', ['$scope', 'StoresFactory', 'song', 'album', function($scope, StoresFactory, song, album){
	
	// check that album matches the song
	if (album && album._id !== song.album) {
		// update the current album
		StoresFactory.getAlbum(song.album);
	}

	$scope.song = song;
}]);