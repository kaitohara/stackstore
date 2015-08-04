app.controller('ModalInstanceCtrl', function($scope, $modalInstance, shareSongInfo, Song, OrderFactory) {
	// OrderFactory.getUser().then(function(data) {
	// $scope.currentId = data;
	// OrderFactory.getCart(data).then(function(cart) {
	// $scope.cartId = cart._id;
	$scope.cartId = OrderFactory.getCurrentOrderID()
		// })
		//})
	$scope.ok = function() {
		$modalInstance.close($scope.selected.item);
	};
	$scope.addSongToCart = function() {
		console.log('woo')
		OrderFactory.addSong2Cart($scope.cartId, $scope.item._id, $scope.item.quantity, $scope.item.price)
		$modalInstance.dismiss('cancel')
	};
	$scope.addAlbumToCart = function() {
		OrderFactory.addAlbum2Cart($scope.cartId, $scope.item._id, $scope.item.quantity, $scope.item.price)
		$modalInstance.dismiss('cancel')
	};
	$scope.item = shareSongInfo.getProperty()
})