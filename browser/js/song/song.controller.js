app.controller('SongCtrl', function ($scope, song, Album){
	$scope.song = song[0];
	Album.getAlbum($scope.song.album).then(function(data){
		$scope.album = data;
	})
});