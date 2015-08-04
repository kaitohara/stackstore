app.factory('Review', function ($http){
	return {
		getReview: function(ids){
			// console.log('id', id.join())
			return $http.get('/api/reviews/'+ ids).then(function(response){
				console.log('factory response', response.data)
				return response.data;
			})
		}
	}
})