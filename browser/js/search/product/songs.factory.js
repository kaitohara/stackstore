'use strict'

app.factory('songs', function ($http){
	return {
		getSongs: function(){
			return $http.get('/api/songs').then(function(response){
				return response.data;
			})
		}
	}
})