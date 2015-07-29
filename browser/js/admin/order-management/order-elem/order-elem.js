app.directive('orderElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/order-management/order-elem/order-elem.html',
		scope: {
			order: '='
		}
	};
});