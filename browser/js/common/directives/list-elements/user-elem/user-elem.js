app.directive('userElem', function(AdminFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/list-elements/user-elem/user-elem.html',
		scope: {
			user: '=',
			change: '&',
			delete: '&',
			reset: '&',
			seller: '&'
		}
	};
});