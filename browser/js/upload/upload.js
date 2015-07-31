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
                console.log('inside the resolve function?', user);
                return $http.get('/api/stores/' + user.store + '/populated')
                    .then(res => res.data);
            }
        }
    });

});

app.controller('UploadCtrl', function ($scope, $state, user, store) {
    $scope.user = user;
    $scope.store = store;
    console.log(user);
    console.log(store);

});