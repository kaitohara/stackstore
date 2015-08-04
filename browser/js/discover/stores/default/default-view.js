app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('discover.stores.default', {
		url: '/default',
		templateUrl: 'js/discover/stores/default/default-view.html',
		controller: 'ViewDefaultCtrl'
	});
}]);

app.controller('ViewDefaultCtrl', ['', function(){
	console.log('ran view default crtl');
}]);