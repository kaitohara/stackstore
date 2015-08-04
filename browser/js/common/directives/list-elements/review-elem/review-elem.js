app.directive('reviewElem', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/list-elements/review-elem/review-elem.html',
		scope: {
			review: '=',
			admin: '='
		}
	};
});