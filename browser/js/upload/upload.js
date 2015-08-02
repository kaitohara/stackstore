app.config(function ($stateProvider) {

    $stateProvider.state('upload', {
        url: '/upload',
        templateUrl: 'js/upload/upload.html',
        controller: 'UploadCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            store: function($http, user) {
                if (user.store) {
                    return $http.get('/api/stores/' + user.store + '/populated')
                        .then(res => res.data)
                        .catch(() => null);
                } else {
                    return null;
                }
            }
        }
    });

});

app.controller('UploadCtrl', function ($scope, $state, user, store) {
    // if no existing store, users can make one
    if (!store) {
        $state.go('upload.create');
    } else {
        $state.go('upload.edit');
    }
});