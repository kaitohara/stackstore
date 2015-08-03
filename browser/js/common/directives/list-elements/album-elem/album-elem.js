app.directive('albumElem', function($state) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/list-elements/album-elem/album-elem.html',
		scope: {
			album: '=',
			admin: '@',
			edit: '&'
		}
	};
});