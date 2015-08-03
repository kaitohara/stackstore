app.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('admin.users', {
		url: '/users',
		templateUrl: 'js/admin/views-management/views-management.html',
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

app.controller('AdminUserCtrl', ['$scope', 'users', 'AdminFactory', function($scope, users, AdminFactory){
	$scope.users = users;
	$scope.changeStatus = function(user, status) {
		console.log('changin status to: ', status, 'for: ', user.name);
		AdminFactory.changeStatus(user._id, status)
			.then(function() {
				console.log('success');
				user.isAdmin = status;
				// // let app know user's status has changed (and they are the active)
				// if (user._id === )
                // $rootScope.$broadcast(AUTH_EVENTS.statusChange, user);
			});
	};
	$scope.changeSeller = function(user, status) {
		console.log('changin status to: ', status, 'for: ', user.name);
		AdminFactory.changeSeller(user._id, status)
			.then(function() {
				console.log('success - seller');
				user.isSeller = status;
			});
	};
	$scope.deleteUser = function(user) {
		console.log('deleting: ', user.name);
		AdminFactory.deleteUser(user._id)
			.then(res => console.log('successful delete'));
	};
	$scope.resetPassword = function(user) {
		console.log('reset password for: ', user.name);
		AdminFactory.resetPassword(user._id)
			.then(res => console.log('successful reset'));
	};
}]);
