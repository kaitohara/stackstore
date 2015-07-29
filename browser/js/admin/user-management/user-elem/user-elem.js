app.directive('userElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/user-management/user-elem/user-elem.html',
		scope: {
			user: '='
		}
	};
});