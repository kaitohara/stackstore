app.directive('songList', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/song-list/song-list.html',
		scope: {
			admin: '=',
			songs: '='
		}
	};
});