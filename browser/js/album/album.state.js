'use strict'

app.config(function ($stateProvider){
	$stateProvider.state('album', {
		url: '/album/:id',
		templateUrl: '/js/album/album.html',
		controller: 'AlbumCtrl',
		resolve: {
			album: function(Album, $stateParams){
				return Album.getAlbum($stateParams.id).then(function(data){
					console.log('state data', data)
					return data
				})
			}
		}
	})
})