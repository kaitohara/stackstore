app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('upload.edit.default', {
		url: '/default',
		templateUrl: 'js/upload/edit/default/default-edit.html',
		controller: 'EditDefaultCtrl'
	});
}]);

app.controller('EditDefaultCtrl', ['$scope', 'EditFactory', function($scope, EditFactory){
	console.log('ran edit default crtl');
	$scope.createSong = false;
	$scope.createAlbum = false;

	$scope.createAlbum = function(albumData) {
		albumData.storeExclusive = true;
		console.log(albumData);
		EditFactory.createAlbum(albumData);
	};
	$scope.toggleCreateSong = function() {
        $scope.createSong = !$scope.createSong;
    };
    $scope.toggleCreateAlbum = function() {
        $scope.createAlbum = !$scope.createAlbum;
    };
}]);