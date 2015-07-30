app.controller('SongCtrl', function ($scope, song, Album, Artist){
	$scope.song = song;
	Album.getAlbum($scope.song.album).then(function(data){
		$scope.album = data;
	})
	Artist.getArtist($scope.song.artist).then(function(data){
		console.log(data)
		$scope.artist = data;
	})
});