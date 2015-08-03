app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('upload.edit.album.song', {
		url: '/song/:songId',
		templateUrl: 'js/upload/edit/album-edit/song-edit/song-edit.html',
		controller: 'EditSongCtrl',
		resolve: {
			song: function(EditFactory, $stateParams) {
				return EditFactory.getSong($stateParams.songId);
			},
			album: function(EditFactory) {
				return EditFactory.currentAlbum;
			}
		}
	});
}]);

app.controller('EditSongCtrl', ['$scope', 'EditFactory', 'song', 'album', function($scope, EditFactory, song, album){
	
	// check that album matches the song
	if (album && album._id !== song.album) {
		// update the current album
		EditFactory.getAlbum(song.album);
	}

	$scope.song = song;
}]);