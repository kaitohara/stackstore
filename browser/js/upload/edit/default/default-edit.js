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
				// attach seller's artist to album
				albumData.artist = user.artistProfile;
				console.log(albumData);
				return EditFactory.getGenreByName(albumData.genre);
			})
			.then(genre => {
				// attach genre id to album
				albumData.genre = genre._id;
				console.log('updated album data', albumData);
				return EditFactory.createAlbum(albumData);
			})
			.then(alb => {
				// add album to store
				EditFactory.currentStore.albums.push(alb);
				return EditFactory.saveToStore(alb._id, EditFactory.currentStore);
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