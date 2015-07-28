'user strict'

app.config(function ($stateProvider) {
	$stateProvider.state('song', {
		url: '/songs/:id',
		templateUrl: 'js/song/song.html',
		controller: 'SongCtrl',
		resolve: {
			song: function(Song, $stateParams) {
				return Song.getSong($stateParams.id).then(function(data){
					return data;
				})
			}
		}
	})
})