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
	$scope.goToSong = function(song) {
		$state.go('upload.edit.album.song', {songId: song._id});
	};
	$scope.defaultAlbum = function() {
        $state.go('upload.edit.album.default');
    };
    $state.go('upload.edit.album.default');
}]);