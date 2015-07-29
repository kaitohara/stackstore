app.factory('Review', function ($http){
	return {
		getReview: function(id){
			// console.log('id', id.join())
			return $http.get('/api/reviews/'+ id).then(function(response){
				console.log('factory response', response.data)
				return response.data;
			})
		}
	}
})