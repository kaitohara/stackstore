app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover.list', {
		url: '/list',
		templateUrl: 'js/discover/list-view/list-view.html',
		controller: 'DiscoverListCtrl',
		resolve: {
			stores: function(DiscoverFactory) {
				return DiscoverFactory.getStores();
			},
			songs: function(DiscoverFactory) {
				return DiscoverFactory.getSongs();
			},
			albums: function(DiscoverFactory) {
				return DiscoverFactory.getAlbums();
			}
		}
	});
}]);

app.controller('DiscoverListCtrl', ['$scope', 'stores', 'songs', 'albums', function($scope, stores, songs, albums){
	$scope.stores = stores;
	$scope.songs = songs;
	$scope.albums = albums;
	console.log('stores', stores);
	console.log('songs', songs);
	console.log('albums', albums);

}]);