'user strict'

app.config(function ($stateProvider){
	$stateProvider.state('shoppingCart', {
		url: '/cart',
		templateUrl: 'js/cart/cart.html',
		controller: 'cartCtrl'
	})
})