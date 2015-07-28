app.controller('AlbumCtrl', function ($scope, album, Artist, Review){
	$scope.album = album;

	Artist.getArtist($scope.album.artist).then(function(data){
		$scope.artist = data;
		// Review.getReview(data.reviews[0]).then(function(reviewData){
		// console.log('albumctrl', reviewData)
		// $scope.reviews = reviewData;

	})

	Review.getReview($scope.album.reviews[0]).then(function(data){
		$scope.review = data;
	})
	



	// $scope.getAlbumArtist = function(){
	// 	Artist.getArtist($scope.album.artist).then(function(data){
	// 		console.log(data)
	// 		$scope.artist = data; 
	// 	})
	// }

})