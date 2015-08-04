app.factory('Album', function ($http){
	return {
		getAlbum: function(id){
			return $http.get('/api/albums/'+id).then(function(response){
				console.log(response.data)
				return response.data;
			})
		},
		getAlbumsByArtist: function(id){
			console.log('in factory', id)
			return $http.get('/api/albums/artist/'+id).then(function(response){
				return response.data;
			})
		}
	}
})