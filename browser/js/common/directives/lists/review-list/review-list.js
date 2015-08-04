app.directive('reviewList', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/review-list/review-list.html',
		scope: {
			admin: '=',
			reviews: '='
		},
		link: function(scope, elem, attrs) {
			scope.noReviews = false;
			if (!attrs.reviews.length) {
				scope.noReviews = true;
			}
		}
	};
});