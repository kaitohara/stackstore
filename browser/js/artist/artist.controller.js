app.controller('ArtistCtrl', function ($scope, artist, $stateParams, Song, Album){
	$scope.artist = artist;
	$scope.artistId = $stateParams.id
	Album.getAlbumsByArtist($scope.artistId).then(function(data){
		console.log(data)
		$scope.albums=data;
	})
});