app.factory('UploadFactory', ['$http', function($http){
	var fact = {};

	fact.createStore = function(storeData) {
		return $http.post('/api/stores', storeData)
			.success(function(res) {
				return $http.put('/api/users/' + storeData.owner, {store: res._id});
			})
			.then(res => res.data);
	};

	return fact;
}]);

