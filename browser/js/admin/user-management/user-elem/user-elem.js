app.directive('userElem', function(AdminFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/user-management/user-elem/user-elem.html',
		scope: {
			user: '=',
			change: '&',
			delete: '&'
		}
	};
});