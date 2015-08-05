app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('upload.edit.album', {
		url: '/album/:albumId/',
		templateUrl: 'js/upload/edit/album-edit/album-edit.html',
		controller: 'EditAlbumCtrl',
		resolve: {
			album: function(EditFactory, $stateParams) {
				return EditFactory.getAlbum($stateParams.albumId);
			}
		}
	});
}]);

app.controller('EditAlbumCtrl', ['$scope', 'EditFactory', 'album', '$state', function($scope, EditFactory, album, $state){
	$scope.album = EditFactory.currentAlbum;
	$scope.createSong = false;
	$scope.toggleCreateSong = function() {
        $scope.createSong = !$scope.createSong;
    };
    $scope.submitSong = function(songData) {
		songData.storeExclusive = true;
		// update song data with album data
		songData.genre = $scope.album.genre[0];
		songData.artist = $scope.album.artist;
		songData.album = $scope.album._id;

		EditFactory.createSong(songData)
			.then(song => {
				// add to local album
				EditFactory.currentAlbum.songs.push(song);
				// add to album in db
				return EditFactory.saveToAlbum(song._id, EditFactory.currentAlbum);
			})
			.then(() => console.log('you did it!'));
	};
	$scope.goToSong = function(song) {
		$state.go('upload.edit.album.song', {songId: song._id});
	};
	$scope.deleteAlbum = function() {
		EditFactory.deleteAlbum($scope.album._id)
			.then(() => {
				// delete all songs from that album too
				var albumSongIds = $scope.album.songs.map(s => s._id);
				_.remove(EditFactory.currentStore.songs, s => _.includes(albumSongIds, s._id));
				console.log('songs', EditFactory.currentStore.songs);
				console.log('album', $scope.album);
				return EditFactory.deleteSongs($scope.album.songs);
			}).then(() => {
				$state.go('upload.edit');
			});
    };
	$scope.defaultAlbum = function() {
        $state.go('upload.edit.album.default');
    };
    $state.go('upload.edit.album.default');
}]);