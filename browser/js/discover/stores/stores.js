app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover.stores', {
		url: '/stores/:storeUrl',
		templateUrl: 'js/discover/stores/stores.html',
		controller: 'StoreCtrl',
		resolve: {
			store: function(DiscoverFactory, $stateParams) {
				return DiscoverFactory.getStoreByUrl($stateParams.storeUrl);
			}
		}
	});
}]);

app.controller('StoreCtrl', ['$scope', 'store', '$state', 'StoresFactory', function($scope, store, $state, StoresFactory){
	$scope.store = store;
    $scope.show = 'albums';
    StoresFactory.currentStore = store;

	$scope.albumView = function(album) {
        $state.go('discover.stores.album', {albumId: album._id});
    };

    $scope.songView = function(song) {
        $state.go('discover.stores.album.song', {songId: song._id});
    };

    $scope.defaultView = function() {
        $state.go('discover.stores', {storeUrl:store.url});
    };
}]);