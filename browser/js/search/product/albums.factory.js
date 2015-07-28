'use strict'

app.factory('albums', function ($http){
	return {
		getAlbums:function(){
			return $http.get('/api/albums').then(function(response){
				return response.data;
			})
		}
	}
});