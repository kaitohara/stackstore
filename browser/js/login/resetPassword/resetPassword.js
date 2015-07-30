app.config(function ($stateProvider) {

    $stateProvider.state('reset', {
        url: '/reset',
        templateUrl: 'js/login/resetPassword/resetPassword.html',
        controller: 'ResetCtrl'
    });

});

app.controller('ResetCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.resetPassword = function(login, reset) {

        $scope.error = null;

        console.log(login, reset);

        AuthService.login(login).then(function (user) {
            return AuthService.resetPassword(user._id, reset.password);
        }).then(user => {
            console.log('all done');
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});