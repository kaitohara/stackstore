app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        console.log('logging in');

        AuthService.login(loginInfo).then(function (user) {
            console.log(user, user.resetPassword);
            if (user.resetPassword) {
                console.log('you have to reset your password');
                $state.go('reset');
            }
            else $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});