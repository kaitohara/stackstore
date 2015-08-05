app.controller('CheckoutCtrl', function ($scope, cart, $state){
	$scope.cart = cart;
	// $scope.getTotal = function(){
	// 	var total = 0;
	// 	$scope.cart.song
	// }
	$scope.submitted = false;
	$scope.submit = function(){

	}
	$scope.number = 10;
	$scope.getNumber = function(num) {
    	return new Array(num);   
	}
	$scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
   $scope.submitted = true;
    if (isValid) {
      $scope.submitSuccess = true;
      $scope.goodToGo = true;
		setTimeout(function(){
			$state.go('complete')
		}, 5000)
    }
  };
})