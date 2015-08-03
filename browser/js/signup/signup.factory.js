app.factory('SignUpFactory', function ($http) {
    function transformData (response) {
        return response.data;
    }
    return {
        add: function(data) {
            return $http.post('/api/users/' , data)
                .then(transformData)
                .then(function(createdUser){
                    return createdUser;
                })
                .then(null, function(err){
                    return err;
                })
        }
    }
});
