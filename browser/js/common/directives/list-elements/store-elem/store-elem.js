app.directive('storeElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/list-elements/store-elem/store-elem.html',
		scope: {
			store: '=',
			admin: '='
		}
	};
});