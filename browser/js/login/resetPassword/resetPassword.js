app.config(function ($stateProvider) {

    $stateProvider.state('reset', {
        url: '/reset',
        templateUrl: 'js/login/resetPassword/resetPassword.html',
        controller: 'ResetCtrl'
    })
    .state('reset.success', {
        url: '/success',
        templateUrl: 'js/login/resetPassword/resetPassword.success.html',
        controller: 'ResetSuccessCtrl'
    })
    .state('reset.confirmed', {
        url: '/confirmed/:id',
        templateUrl: 'js/login/resetPassword/resetPassword.html',
        controller: 'ResetCtrl'
    })
});

app.controller('ResetCtrl', function ($scope, AuthService, $state,$stateParams, SignUpFactory) {

    $scope.show=false;
    $scope.login = {};
    $scope.error = null;
console.log('what is the state params', $stateParams);
    // show form if reset is valid
    if($stateParams.email) {

        SignUpFactory
            .getUser($stateParams.email)
            .then(function(user){
                if(user._id) {
                    return $scope.show=true;
                }
            })
            .then(null, function(err){
                return err;
            })

    }

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
