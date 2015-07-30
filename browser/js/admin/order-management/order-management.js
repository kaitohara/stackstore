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

app.controller('AdminOrderCtrl', ['$scope', 'orders', function($scope, orders){
	$scope.orders = orders;

}]);