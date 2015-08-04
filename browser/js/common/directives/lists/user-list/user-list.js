app.directive('userList', function(FormFactory){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/user-list/user-list.html',
		scope: {
			admin: '=',
			users: '='
		},
		link: function(scope, elem, attrs) {

		}
	};
});