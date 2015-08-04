app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, ResetPasswordFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.reset = function(email){

        console.log('what is this email', $scope.login.email);
        if($scope.login.email) {
            ResetPasswordFactory.resetUser(email)
                .then(function(user){
                    if(user._id){
                        $state.user=user;
                        $state.go('reset.success');
                    }
                    else {
                        return "Unknown User"
                    }
                })
                .catch(function(err){
                    console.log('is this error running', err);
                    $scope.error = err;
                })
        }
        else {
            $scope.error = "Please Enter a Valid Email";
        }
    }
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
