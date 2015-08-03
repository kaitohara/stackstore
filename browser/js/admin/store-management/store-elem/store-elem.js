app.directive('storeElem', function(AdminFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/store-management/store-elem/store-elem.html',
		scope: {
			store: '='
		}
	};
});