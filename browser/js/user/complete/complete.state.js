app.config(function($stateProvider){
	$stateProvider
		.state('complete', {
			url: '/cart/checkout/ordercomplete',
			controller: 'CompleteCtrl',
			templateUrl: 'js/user/complete/complete.html'
		})
});

