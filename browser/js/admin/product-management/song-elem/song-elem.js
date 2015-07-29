app.directive('songElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/product-management/song-elem/song-elem.html',
		scope: {
			song: '='
		}
	};
});