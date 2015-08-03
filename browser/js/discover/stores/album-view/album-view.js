app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover.stores.album', {
		url: '/album/:albumId/',
		templateUrl: 'js/discover/stores/album-view/album-view.html',
		controller: 'ViewAlbumCtrl',
		resolve: {
			album: function(StoresFactory, $stateParams) {
				return StoresFactory.getAlbum($stateParams.albumId);
			}
		}
	});
}]);

app.controller('ViewAlbumCtrl', ['$scope', 'album', '$state', 'StoresFactory', function($scope, album, $state, StoresFactory){
	$scope.album = StoresFactory.currentAlbum;
	$scope.defaultAlbum = function() {
        $state.go('discover.stores.album.default');
    };
    $state.go('discover.stores.album.default');
}]);