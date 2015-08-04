'user strict'

app.config(function ($stateProvider) {
	$stateProvider.state('purchaseModal', {
		views:{
			"modal":{
				templateUrl: 'js/song/song.html'
			}
		},
		abstract: true
	});
});