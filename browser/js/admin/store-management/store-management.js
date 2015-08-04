app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('admin.stores', {
		url: '/stores',
		templateUrl: 'js/admin/store-management/store-management.html',
		controller: 'AdminStoreCtrl',
		resolve: {
			stores: function($http) {
				return $http.get('/api/stores')
					.then(function(res) {
						return res.data;
					});
			}
		}
	});
}]);

app.controller('AdminStoreCtrl', ['$scope', 'stores', function($scope, stores){
	$scope.stores = stores;
	console.log('store ctrl ran');
}]);