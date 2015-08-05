app.directive('albumForm', function(FormFactory){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/forms/album-form/album-form.html',
		scope: {
			submit: '&',
			admin: '='
		},
		link: function(scope) {
			FormFactory.getGenres()
				.then(genres => scope.genres = genres);
			
			FormFactory.getArtists()
				.then(artists => scope.artists = artists);

			scope.newAlbum = {};

			scope.newArtist = false;
			scope.oldArtist = true;

			scope.toggleNewArtist = function() {
				if (scope.oldArtist) scope.oldArtist = false;
				scope.newArtist = !scope.newArtist;
				scope.newAlbum.artist = '';
			};
			scope.toggleOldArtist = function() {
				if (scope.newArtist) scope.newArtist = false;
				scope.oldArtist = !scope.oldArtist;
				scope.newAlbum.artist = '';
			};
		}
	};
});