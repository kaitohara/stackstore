app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('admin.orders', {
		url: '/orders',
		templateUrl: 'js/admin/order-management/order-management.html',
		controller: 'AdminOrderCtrl',
		resolve: {
			orders: function($http) {
				return $http.get('/api/orders')
					.then(function(res) {
						return res.data;
					});
			}
		}
	});
}]);

app.controller('AdminOrderCtrl', ['$scope', 'orders', 'AdminFactory', function($scope, orders, AdminFactory){
	$scope.orders = orders;

	$scope.changeStatus = function(order, status) {
		AdminFactory.changeOrderStatus(order._id, status)
			.then((res) => {
				console.log(res);
				order.orderStatus = status;
				order.date = res.date;
			});
	};

}]);