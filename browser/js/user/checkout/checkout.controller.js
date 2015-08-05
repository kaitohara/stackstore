app.controller('CheckoutCtrl', function ($scope, cart, $state, checkoutFactory){
	$scope.cart = cart;
	// $scope.getTotal = function(){
	// 	var total = 0;
	// 	$scope.cart.song
	// }
	$scope.submitted = false;
	$scope.submitSuccess = false;
	$scope.number = 10;
	$scope.email
	$scope.getNumber = function(num) {
		return new Array(num);   
	}
	$scope.submitForm = function(isValid) {

		$scope.submitted = true;
		if (isValid) {
			$scope.submitSuccess = true;
			$scope.goodToGo = true;
			setTimeout(function(){
				checkoutFactory.submitOrder($scope.email, $scope.cart).then(function(data){
					$state.go('complete')
				})
			}, 5000)
		}
	};
})