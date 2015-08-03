app.directive('orderList', function(FormFactory){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/order-list/order-list.html',
		scope: {
			admin: '=',
			orders: '='
		},
		link: function(scope, elem, attrs) {

		}
	};
});