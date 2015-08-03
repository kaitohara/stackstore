app.controller('navbarCtrl', function($scope, $rootScope) {
    $scope.search
    $scope.bool = false;
    //Typing in the search box broadcasts what's being typed
    //Search Slider = closed if search textbox = pristine
    //Search Slider = expanded if search textbox = dirty
    $scope.update = function(val, bool) {
            $rootScope.$broadcast('searching', {
                search: val
            })
            if (bool !== $scope.bool) {
                $scope.widgetExpanded = !$scope.widgetExpanded
                $rootScope.$broadcast('clicked', {
                    clicked: $scope.widgetExpanded
                })
            }
            $scope.bool = bool;
        }
    
    //Search slider closes if search bar loses focus
    $scope.closeSlider = function(){
        $rootScope.$broadcast('clicked', {
            clicked: false
        })
    }
    //If search bar already has text, clicking on it will expand it
    $scope.expandSlider = function(){
        if (!!$scope.search){
           $rootScope.$broadcast('clicked', {
            clicked: true
        }) 
        }
    }
})