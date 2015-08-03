app.directive('storeList', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/store-list/store-list.html',
		scope: {
			stores: '='
		},
		link: function(scope, elem, attrs) {

		}
	};
});