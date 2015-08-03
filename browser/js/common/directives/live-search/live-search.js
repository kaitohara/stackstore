app.directive('liveSearch', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/live-search/live-search.html',
    controller: function($scope) {
      $rootScope.$on('searching', function(event, args) {
        $scope.search = args.search
        console.log('update', args)
      })
      $scope.closeSlide = function(){
        console.log('toggle this shit')
        $scope.widgetExpanded = false;
      }
      $scope.widgetExpanded = false;
      $rootScope.$on('clicked', function(event, args) {
        console.log('clicked', args)
        $scope.widgetExpanded = args.clicked
      })
    }
  }
})