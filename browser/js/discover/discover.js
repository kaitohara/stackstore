app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover', {
		url: '/discover',
		templateUrl: 'js/discover/discover.html',
		controller: 'DiscoverCtrl'
	});
}]);

app.controller('DiscoverCtrl', ['$scope', function($scope){

}]);