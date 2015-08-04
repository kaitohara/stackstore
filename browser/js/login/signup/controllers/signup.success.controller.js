app.controller('SignUpSuccessCtrl', function($scope, $state, $timeout){
    $scope.counter = 6;

    $scope.onTimeout = function(){
        if($scope.counter===0){
            $state.go('login');
        }
        else {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout,1000);
        }
    }

    var mytimeout = $timeout($scope.onTimeout,1000);


});
