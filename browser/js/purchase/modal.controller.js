app.controller('ModalInstanceCtrl', function($scope, $modalInstance, shareSongInfo, Song, OrderFactory, Session) {
	$scope.error = null;
	$scope.cartId = Session.cart._id;
	$scope.item = shareSongInfo.getProperty()
	$scope.ok = function() {
		$modalInstance.close($scope.item); //selected.
	};
	$scope.addSongToCart = function() {
		$scope.error = null;
		OrderFactory.addSong2Cart($scope.cartId, $scope.item._id, $scope.item.quantity, $scope.item.price)
			.then(function(res) {
				$modalInstance.dismiss('cancel')
			})
			.then(null, function(err) {
				if (err.status === 304) {
					$scope.error = "This song is already in your cart!"
				}
				// $modalInstance.dismiss('cancel')
			})
	};
	$scope.addAlbumToCart = function() {
		$scope.error = null;
		OrderFactory.addAlbum2Cart($scope.cartId, $scope.item._id, $scope.item.quantity, $scope.item.price)
			.then(function(res) {
				$modalInstance.dismiss('cancel')
			})
			.then(null, function(err) {
				if (err.status === 304) {
					$scope.error = "This album is already in your cart!";
				}
				// $modalInstance.dismiss('cancel')
			});
	}
})