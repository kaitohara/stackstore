
app.controller('SignUpCtrl', function ($scope, AuthService, $state) {
console.log('are you runnning?');
    $scope.signup = {};

    $scope.sendLogin = function (signupInfo) {

        $scope.error = null;

        console.log('signing up');

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

        AuthService.signup(signupInfo).then(function (user) {
            console.log(user);
            //$state.go('additional');
            if(user._id){
                $state.signup=user;
                $state.go('signup.success');
            } else {
                return "User Validation Failed";
            }
        }).catch(function () {
            $scope.error = 'Invalid signup credentials.';
        });
    };

});





app.controller('SignUpCtrl', function($scope, $state, SignUpFactory){

    $scope.user = {};
    $scope.error = null;
    $scope.show = true;


});
