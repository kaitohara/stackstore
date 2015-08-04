app.directive('reviewList', function(FormFactory){
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
			console.log('these reviews', attrs.reviews);
			if (!attrs.reviews.length) {
				console.log('no reviews');
				scope.noReviews = true;
			}
		}
	};
});