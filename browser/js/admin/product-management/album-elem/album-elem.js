app.directive('albumElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/product-management/album-elem/album-elem.html',
		scope: {
			album: '='
		}
	};
});