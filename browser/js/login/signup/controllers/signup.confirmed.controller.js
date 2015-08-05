app.controller('SignUpConfirmedCtrl', function($scope, $state, $stateParams, $timeout, SignUpFactory){

    $scope.counter = 6;

    $scope.onTimeout = function(){
        $scope.show=false;
        if($scope.counter===0){
            $scope.show=true;
            $state.go('login');
        }
        else {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout,1000);
        }
    }

    var mytimeout = $timeout($scope.onTimeout,1000);

    console.log('what is the state params', $stateParams.id);
    SignUpFactory
        .getUserById($stateParams.id)
        .then(function(user){
            $scope.show=false;
            console.log('this is the found user', user);
            if(user._id){
                $scope.signup=user;

            } else throw new Error()
        })
        .catch(function(err){
            console.log('what is the error', err);
            $scope.error = err;
        });




});
