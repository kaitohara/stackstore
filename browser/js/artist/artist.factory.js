app.factory('Artist', function ($http){
	return {
		getArtist: function(id){
			return $http.get('/api/artists/'+id).then(function(response){
				return response.data;
			})
		}
	}
});