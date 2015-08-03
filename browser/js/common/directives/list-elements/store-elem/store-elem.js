app.directive('storeElem', function(AdminFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/list-elements/store-elem/store-elem.html',
		scope: {
			store: '=',
			admin: '='
		}
	};
});