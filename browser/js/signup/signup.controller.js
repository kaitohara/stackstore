app.controller('SignUpCtrl', function($scope, $state, SignUpFactory){

    $scope.user = {};
    $scope.error = null;
    $scope.show = true;

    $scope.signUpUser = function(signUpInfo) {
        $scope.show = false;
        $scope.type = 'info';
        $scope.dynamic = 100;

        SignUpFactory
            .add(signUpInfo)
            .then(function(user){
                if(user.status === 201){
                    //$state.go('signup/confirm');
                    console.log('this is success user', user)
                } else {
                    $scope.error = "User Validation Failed";
                }
            })
            .catch(function(){
                console.log(err);
                $scope.error = "User Validation Failed";
            });
        $scope.show=true;
    }
});
