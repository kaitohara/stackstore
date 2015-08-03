app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover', {
		url: '/discover',
		templateUrl: 'js/discover/discover.html',
		controller: 'DiscoverCtrl',
		resolve: {
			stores: function(DiscoverFactory) {
				return DiscoverFactory.getStores();
			}
		}
	});
}]);

app.controller('DiscoverCtrl', ['$scope', 'stores', function($scope, stores){
	$scope.stores = stores;
	console.log('stores', stores);
}]);