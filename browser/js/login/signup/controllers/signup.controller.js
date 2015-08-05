
app.controller('SignUpCtrl', function ($scope, AuthService, $state) {

    $scope.signup = {};
    $scope.show=true;

    $scope.sendLogin = function (signupInfo) {

        $scope.show=false;
        $scope.error = null;

        console.log('signing up');

        AuthService.signup(signupInfo).then(function (user) {
            console.log(user);

            //$state.go('additional');
            if(user._id){
                $state.signup = user;
                $state.go('signup.success');
                $scope.show = true;
            } else {
                return "User Validation Failed";
            }
        }).catch(function () {
            $scope.error = 'Invalid signup credentials.';
            $scope.show = true;
        });
    };

});

//$scope.signUpUser = function(signUpInfo) {
//    $scope.show = false;
//    console.log("are you running?", signUpInfo)
//    SignUpFactory
//        .add(signUpInfo)
//        .then(function(user){
//            if(user._id){
//                $state.signup=user;
//                $state.go('signup.success');
//            } else {
//                return "User Validation Failed";
//            }
//        })
//        .catch(function(err){
//            $scope.show=true;
//            if(err){
//                $scope.error = "User Validation Failed"
//            }
//            else {
//                console.log(err);
//                $scope.error = "Database issue";
//            }
//        });
//    $scope.show=true;
//}
