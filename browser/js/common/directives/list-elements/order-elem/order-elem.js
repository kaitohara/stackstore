app.directive('orderElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/list-elements/order-elem/order-elem.html',
		scope: {
			order: '=',
			status: '&'
		}
	};
});