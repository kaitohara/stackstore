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

    console.log(user);
    console.log(store);

});