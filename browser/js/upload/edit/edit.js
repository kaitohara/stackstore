app.config(function ($stateProvider) {

    $stateProvider.state('upload.edit', {
        url: '/edit/',
        templateUrl: 'js/upload/edit/edit.html',
        controller: 'EditCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser(true);
            },
            store: function($http, user) {
                console.log(user);
                return $http.get('/api/stores/' + user.store + '/populated')
                    .then(res => res.data);
            }
        }
    });
    
});

app.controller('EditCtrl', function ($scope, $state, user, store) {
    $scope.user = user;
    $scope.store = store;
    $scope.show = 'songs';
    $scope.createAlbum = false;
    $scope.createSong = false;

    console.log(user);
    console.log(store);

    $scope.toggleCreateAlbum = function() {
        $scope.createAlbum = !$scope.createAlbum;
    };
    $scope.toggleCreateSong = function() {
        $scope.createSong = !$scope.createSong;
    };

    $scope.albumEdit = function(album) {
        console.log('in album edit', album);
        $state.go('upload.edit.album', {albumId: album._id});
    };

    $state.go('upload.edit.default');
});

// can make albums, can only add songs to albums