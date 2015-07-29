app.controller('SongCtrl', function ($scope, song, Album){
	$scope.song = song;
	Album.getAlbum($scope.song.album).then(function(data){
		console.log('gotAlbum?', $scope.song.album, data)
		$scope.album = data;
	})
});