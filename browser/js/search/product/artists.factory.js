'use strict';

app.factory('artists', function ($http) {

	return {
		getArtists: function() {
			return $http.get('/api/artists').then(function(response){
				return response.data
			})
		}
	}

})