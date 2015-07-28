'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('artist', {
		url: '/artists/:name',
		templateUrl: 'js/artist/artist.html',
		controller: 'ArtistCtrl',
		params: {
			id: null
		},
		resolve: {
			artist: function(Artist, $stateParams) {
				return Artist.getArtist($stateParams.id).then(function(response){
					console.log(response)
					return response
				})
			}
		}
	})
})