app.directive('songForm', function(FormFactory){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/forms/song-form/song-form.html',
		scope: {
			submit: '&',
			admin: '='
		},
		link: function(scope) {
			FormFactory.getAlbums()
				.then(albums => scope.albums = albums);
		}
	};
});