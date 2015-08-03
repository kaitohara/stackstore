app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('upload.edit.album.default', {
		url: '/default',
		templateUrl: 'js/upload/edit/album-edit/default/default-album-edit.html',
		controller: 'AlbumEditDefaultCtrl'
	});
}]);

app.controller('AlbumEditDefaultCtrl', ['$scope', function($scope){

}]);