app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('upload.edit.default', {
		url: '/default',
		templateUrl: 'js/upload/edit/default/default-edit.html',
		controller: 'EditDefaultCtrl'
	});
}]);

app.controller('EditDefaultCtrl', ['$scope', 'EditFactory', 'AuthService', function($scope, EditFactory, AuthService){
	console.log('ran edit default crtl');
	$scope.createSong = false;
	$scope.createAlbum = false;

	/// the logged in user has to be the artist
	$scope.createAlbum = function(albumData) {
		albumData.storeExclusive = true;
		albumData.songs = [];
		// attach logged in seller as the artist
		AuthService.getLoggedInUser()
			.then(user => {
				albumData.artist = user.artistProfile;
				console.log(albumData);
				return EditFactory.createAlbum(albumData);
			})
			.then(res => console.log('done'));
	};
	$scope.toggleCreateSong = function() {
        $scope.createSong = !$scope.createSong;
    };
    $scope.toggleCreateAlbum = function() {
        $scope.createAlbum = !$scope.createAlbum;
    };
}]);