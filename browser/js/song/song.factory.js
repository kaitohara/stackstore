app.factory('Song', function ($http){
	return {
		getSong: function(id){
			//here 'id' is a concatenated string of Ids being queried
			return $http.get('/api/songs/'+id).then(function(response){
				return response.data;
			})
		}
	}
})