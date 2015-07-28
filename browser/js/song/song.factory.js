app.factory('Song', function ($http){
	return {
		getSong: function(id){
			return $http.get('/api/songs/'+id).then(function(response){
				return response.data;
			})
		}
	}
})