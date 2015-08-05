app.config(function ($stateProvider) {

    $stateProvider.state('upload.edit', {
        url: '/edit',
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

app.controller('EditCtrl', function ($scope, $state, user, EditFactory, AuthService) {
    $scope.user = user;
    $scope.store = EditFactory.currentStore;
    $scope.show = 'albums';
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
        $state.go('upload.edit');
    };

    /// the logged in user has to be the artist
    $scope.submitAlbum = function(albumData) {
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
            .then(() => console.log('done'));
    };

});

// can make albums, can only add songs to albums