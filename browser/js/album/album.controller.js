app.controller('AlbumCtrl', function ($scope, album, Artist, Review, Song, $modal, shareSongInfo){
		
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

	shareSongInfo.setProperty(album)

	$scope.openModal = function(){
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'js/purchase/modalAlbumView.html',
			controller: 'ModalInstanceCtrl',
			windowClass: 'center-modal'
		})
		modalInstance.result.then(function(){
		}, function(){
		});
	};

	// $scope.getAlbumArtist = function(){
	// 	Artist.getArtist($scope.album.artist).then(function(data){
	// 		console.log(data)
	// 		$scope.artist = data; 
	// 	})
	// }

})