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
        alert('you have no store yet');
        $state.go('upload.create');
    } else {
        alert('update your store');
        $state.go('upload.edit');
    }
});