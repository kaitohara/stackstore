app.directive('songForm', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/forms/song-form/song-form.html',
		scope: {
			submit: '&'
		}
	};
});