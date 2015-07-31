app.config(function ($stateProvider) {

    $stateProvider.state('upload.create', {
        url: '/create',
        templateUrl: 'js/upload/create/create.html',
        controller: 'CreateCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
    
});

app.controller('CreateCtrl', function ($scope, $state, user, UploadFactory) {
    $scope.user = user;
    $scope.createStore = function(store) {
        // add user to new store
        store.owner = user._id;

        console.log('youre making this store, bro: ', store);
        console.log('nice!');

        UploadFactory.createStore(store)
            .then(res => {
                console.log('you did it!', res);
                $state.go('upload.edit', res.url);
            });
    };

    console.log(user);
    console.log('hey man -createCtrl');
});