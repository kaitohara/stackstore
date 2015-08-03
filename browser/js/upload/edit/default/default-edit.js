app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('upload.edit.default', {
		url: '/default',
		templateUrl: 'js/upload/edit/default/default-edit.html',
		controller: 'EditDefaultCtrl'
	});
}]);

app.controller('EditDefaultCtrl', ['$scope', 'AdminFactory', function($scope, AdminFactory){
	console.log('ran edit default crtl');

}]);