app.directive('orderList', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/order-list/order-list.html',
		scope: {
			admin: '=',
			orders: '='
		}
	};
});