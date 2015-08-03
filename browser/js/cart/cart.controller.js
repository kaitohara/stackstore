app.controller('cartCtrl', function ($scope, Cart){
	$scope.test = 'test'
	//cart._id
	Cart.getUser().then(function(data){
		$scope.currentId = data;
		Cart.getCart(data).then(function(cart){
			$scope.cart = cart;
		})
	})
	$scope.removeSong = function(pullId){
		Cart.removeSong($scope.cart._id, pullId).then(function(){
			Cart.getCart($scope.currentId).then(function(cart){
				$scope.cart = cart;
			})
		})
	}
	$scope.removeAlbum = function(pullId){
		Cart.removeAlbum($scope.cart._id, pullId).then(function(){
			Cart.getCart($scope.currentId).then(function(cart){
				$scope.cart = cart;
			})
		})
	}
})
app.factory('Cart', function ($http){
	return {
		getUser: function(){
			console.log('factory')
			return $http.get('/api/members/me').then(function(response){
				return response.data
			})
		},
		getCart: function(id){
			console.log('getCart', id)
			return $http.get('/api/users/'+id+'/cart').then(function(response){
				return response.data
			})
		},
		removeSong: function(orderId, pullId){
			return $http.post('/api/orders/removeSong', {orderId: orderId, pullId:pullId}).then(function(response){
				console.log('removeItem', response.data)
			})
		},
		removeAlbum: function(orderId, pullId){
			return $http.post('/api/orders/removeAlbum', {orderId: orderId, pullId:pullId}).then(function(response){
				console.log('removeItem', response.data)
			})
		}
		// addSong: function(orderId, song){

		// }
	}
})