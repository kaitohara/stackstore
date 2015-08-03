app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('upload.edit.album.default', {
		url: '/default',
		templateUrl: 'js/upload/edit/album-edit/default/default-album-edit.html',
		controller: 'AlbumEditDefaultCtrl'
	});
}]);

app.controller('AlbumEditDefaultCtrl', ['$scope', 'EditFactory', function($scope, EditFactory){
	$scope.deleteSong = function(song) {
		console.log('deleting this', song);
		EditFactory.deleteSong(song._id)
			.then(res => {
				// remove from local album
				_.pull(EditFactory.currentAlbum.songs, song);
			});
	};
}]);