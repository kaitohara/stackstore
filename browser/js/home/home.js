app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function($scope, $rootScope){

        	$scope.widgetExpanded = false;
        	$rootScope.$on('clicked', function(event, args){
        		console.log('clicked', args)
        		$scope.widgetExpanded = args.clicked
        	})
        	$rootScope.$on('searching', function(event, args){
    			$scope.search = args.search
   			})
        	
        }
    });
});

