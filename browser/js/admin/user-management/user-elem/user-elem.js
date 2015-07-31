app.directive('userElem', function(AdminFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/views-management/views-elem/views-elem.html',
		scope: {
			user: '=',
			change: '&',
			delete: '&',
			reset: '&'
		}
	};
});
