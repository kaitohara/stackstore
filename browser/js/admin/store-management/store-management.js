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

app.controller('AdminStoreCtrl', ['$scope', 'AdminFactory', 'stores', function($scope, AdminFactory, stores){
	$scope.stores = stores;
	console.log('store ctrl ran');

	$scope.deleteStore = function(store) {
		AdminFactory.deleteStore(store._id)
			.then(() => {
				_.remove(stores, st => st._id === store._id);
			});
	};

	$scope.updateStore = function(store, config) {
		AdminFactory.updateStore(store._id, config)
			.then(() => {
				// update corresponding member of stores array
			});
	};

}]);