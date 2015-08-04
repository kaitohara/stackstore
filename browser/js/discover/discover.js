app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover', {
		abstract: true,
		url: '/discover',
		templateUrl: 'js/discover/discover.html',
		controller: 'DiscoverCtrl'
	});
}]);

app.controller('DiscoverCtrl', ['$scope', function($scope){

}]);