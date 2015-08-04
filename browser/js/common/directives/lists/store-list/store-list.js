app.directive('storeList', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/store-list/store-list.html',
		scope: {
			admin: '=',
			stores: '='
		},
		link: function(scope, elem, attrs) {

		}
	};
});