app.directive('categoryForm', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/forms/category-form/category-form.html',
		scope: {
			submit: '&'
		}
	};
});