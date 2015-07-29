app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('admin.users', {
		url: '/users',
		templateUrl: 'js/admin/user-management/user-management.html',
		controller: 'AdminUserCtrl',
		resolve: {
			users: function($http) {
				return $http.get('/api/users')
					.then(function(res) {
						return res.data;
					});
			}
		}
	});
}]);

app.controller('AdminUserCtrl', ['$scope', 'users', function($scope, users){
	$scope.users = users;
}]);