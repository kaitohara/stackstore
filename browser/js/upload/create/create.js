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

app.controller('CreateCtrl', function ($scope, $state, user, UploadFactory, Session) {
    $scope.user = user;
    $scope.createStore = function(store) {
        // add user to new store
        store.owner = user._id;

        UploadFactory.createStore(store)
            .then(res => {
                Session.updateUser({store: res._id});
                $state.go('upload.edit');
            });
    };
});