app.factory('Album', function ($http){
	return {
		getAlbum: function(id){
			console.log('in factory', id)
			return $http.get('/api/albums/'+id).then(function(response){
				console.log('factory response', response.data)
				return response.data;
			})
		}
	}
})