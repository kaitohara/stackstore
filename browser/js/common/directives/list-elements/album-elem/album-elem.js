app.directive('albumElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/list-elements/album-elem/album-elem.html',
		scope: {
			album: '=',
			admin: '=',
			edit: '&'
		}
	};
});