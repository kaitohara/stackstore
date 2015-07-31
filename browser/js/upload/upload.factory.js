app.factory('UploadFactory', ['$http', function($http){
	var fact = {};

	fact.createStore = function(storeData) {
		return $http.post('/api/stores', storeData)
			.then(function(res) {
				console.log(res);
				return $http.put('/api/users/' + storeData.owner, {store: res._id});
			})
			.then(res => res.data);
	};

	return fact;
}]);

