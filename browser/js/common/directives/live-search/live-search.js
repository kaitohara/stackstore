app.directive('liveSearch', function($rootScope, $state) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/live-search/live-search.html',
    controller: function($scope, $rootScope) {
      $rootScope.$on('searching', function(event, args) {
        $scope.search = args.search
        console.log('update', args)
      })
      $scope.toggleSlide = function(){
        console.log('toggle this shit')
        $scope.widgetExpanded = !$scope.widgetExpanded;
      }
      $scope.widgetExpanded = false;
      $rootScope.$on('clicked', function(event, args) {
        console.log('clicked', args)
        $scope.widgetExpanded = args.clicked
      })
    }
  }
})