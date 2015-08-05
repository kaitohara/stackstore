app.factory('checkoutFactory', function ($http){
	return {
		submitOrder: function(email, cart){
			return $http.post('/api/orders/checkout', {email: email, cart:cart}).then(function(data){
				console.log('after post')
				return data;
			})
		}
	}
})