app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, shareSongInfo, Song, Cart){
	Cart.getUser().then(function(data){
		$scope.currentId = data;
		Cart.getCart(data).then(function(cart){
			$scope.cartId = cart._id;
		})
	})
	$scope.ok = function(){
		$modalInstance.close($scope.selected.item);
	};
	$scope.addSongToCart = function(){
		console.log('woo')
		Cart.addSong2Cart($scope.cartId, $scope.item._id, $scope.item.quantity, $scope.item.price)
		$modalInstance.dismiss('cancel')
	};
	$scope.addAlbumToCart = function(){
		Cart.addAlbum2Cart($scope.cartId, $scope.item._id, $scope.item.quantity, $scope.item.price)
		$modalInstance.dismiss('cancel')
	};
	$scope.item = shareSongInfo.getProperty()
})
