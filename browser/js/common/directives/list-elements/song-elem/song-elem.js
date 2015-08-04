app.directive('songElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/list-elements/song-elem/song-elem.html',
		scope: {
			song: '=',
			admin: '=',
			edit: '&',
			delete: '&',
			update: '&'
		}
	};
});
