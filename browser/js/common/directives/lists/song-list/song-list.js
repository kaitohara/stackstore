app.directive('songList', function(FormFactory){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/song-list/song-list.html',
		scope: {
			admin: '=',
			songs: '='
		},
		link: function(scope, elem, attrs) {

		}
	};
});