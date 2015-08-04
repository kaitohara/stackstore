app.directive('albumForm', function(FormFactory){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/forms/album-form/album-form.html',
		scope: {
			submit: '&',
			admin: '='
		},
		link: function(scope, elem, attrs) {
			console.log('rna album form directive');
			FormFactory.getGenres()
				.then(genres => scope.genres = genres);
		}
	};
});