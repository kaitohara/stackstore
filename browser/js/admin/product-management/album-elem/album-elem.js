app.directive('albumElem', function($state) {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/product-management/album-elem/album-elem.html',
		scope: {
			album: '=',
			admin: '@',
			edit: '&'
		}
	};
});