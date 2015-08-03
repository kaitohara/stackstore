app.factory('Song', function ($http){
	return {
		getSong: function(id){
			//here 'id' is a concatenated string of Ids being queried
			return $http.get('/api/songs/'+id).then(function(response){
				console.log('here',id, response.data)
				return response.data;
			})
		},
		addSong2Cart: function(orderId, songId){
			console.log('song added ', orderId, songId)
			return $http.post('/api/orders/addSong', {orderId: orderId, songId:songId}).then(function(){
				return console.log('added succesfully?!')
			})
		}
	}
})