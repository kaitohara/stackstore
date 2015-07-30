app.controller('AlbumCtrl', function ($scope, album, Artist, Review, Song){
	$scope.album = album;

	Artist.getArtist($scope.album.artist).then(function(data){
		$scope.artist = data;
		// Review.getReview(data.reviews[0]).then(function(reviewData){
		// console.log('albumctrl', reviewData)
		// $scope.reviews = reviewData;

	})

	Review.getReview($scope.album.reviews.join()).then(function(data){
		// console.log($scope.album.reviews.join().split(','))
		$scope.reviews = data;
	})
	
	Song.getSong($scope.album.songs.join()).then(function(data){
		$scope.songs = data;
	})



	// $scope.getAlbumArtist = function(){
	// 	Artist.getArtist($scope.album.artist).then(function(data){
	// 		console.log(data)
	// 		$scope.artist = data; 
	// 	})
	// }

})