app.config(function ($stateProvider) {

    $stateProvider.state('upload.edit', {
        url: '/edit/',
        templateUrl: 'js/upload/edit/edit.html',
        controller: 'EditCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser(true);
            },
            store: function(EditFactory, user) {
                return EditFactory.getStorePopulated(user.store);
            }
        }
    });
    
});

app.controller('EditCtrl', function ($scope, $state, user, EditFactory) {
    $scope.user = user;
    $scope.store = EditFactory.currentStore;
    $scope.show = 'songs';
    $scope.createAlbum = false;
    $scope.createSong = false;

    $scope.toggleCreateAlbum = function() {
        $scope.createAlbum = !$scope.createAlbum;
    };
    $scope.toggleCreateSong = function() {
        $scope.createSong = !$scope.createSong;
    };

    $scope.albumEdit = function(album) {
        $state.go('upload.edit.album', {albumId: album._id});
    };

    $scope.songEdit = function(song) {
        $state.go('upload.edit.album.song', {songId: song._id});
    };

    $scope.defaultEdit = function() {
        $state.go('upload.edit.default');
    };

    $state.go('upload.edit.default');
});

// can make albums, can only add songs to albums