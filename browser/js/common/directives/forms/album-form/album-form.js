app.directive('albumForm', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/forms/album-form/album-form.html',
		scope: {
			submit: '&'
		},
		link: function() {
			console.log('rna album form directive');
		}
	};
});