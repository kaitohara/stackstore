app.directive('albumList', function(FormFactory){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/album-list/album-list.html',
		scope: {
			admin: '=',
			albums: '='
		},
		link: function(scope, elem, attrs) {

		}
	};
});