app.controller('navbarCtrl', function ($scope, $rootScope){
    // var updateSearch = function(){
    //     $scope.searchTerm = Search
    // }
    $scope.search
    $scope.bool = false;
    $scope.update = function(val, bool){
        $rootScope.$broadcast('searching', {search:val})
        console.log(bool, $scope.bool)
        if (bool !== $scope.bool){
            $scope.widgetExpanded = !$scope.widgetExpanded 
            $rootScope.$broadcast('clicked', {clicked:$scope.widgetExpanded})
        }
        $scope.bool = bool;

    }
    // $scope.widgetExpanded = false;
    $scope.click = function(){
        console.log('ctrl click')
        $scope.widgetExpanded = !$scope.widgetExpanded 
        $rootScope.$broadcast('clicked', {clicked:$scope.widgetExpanded})
    }


    // $scope.update = function(val){
    //     Search.update(val)
    //     console.log(val, Search.searchTerm)
    //     console.log($scope.test)
    // }
    // $scope.$watch(Search.term, function(){
    //     console.log('a')
    // })
}) 