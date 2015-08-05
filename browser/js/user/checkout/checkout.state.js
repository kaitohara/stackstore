app.config(function($stateProvider){
	$stateProvider
		.state('checkout', {
			url: '/cart/checkout',
			controller: 'CheckoutCtrl',
			templateUrl: 'js/user/checkout/checkout.html',
			resolve: {
				cart: (AuthService) =>
					AuthService.getCart()
			}
		})
});

