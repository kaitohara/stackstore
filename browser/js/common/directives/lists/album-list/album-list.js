app.directive('albumList', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/lists/album-list/album-list.html',
		scope: {
			admin: '=',
			albums: '=',
			delete: '&',
			update: '&'
		}
	};
});