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
        },
        getUser: function(user) {
            return $http.get('/api/users/', user)
                .then(transformData)
                .then(function(user){
                    return user;
                })
                .then(null, function(err){
                    return err;
                })
        },
        getUserById: function(id) {
            return $http.get('/api/users/'+ id)
                .then(transformData)
                .then(function(user){
                    return user;
                })
                .then(null, function(err){
                    return err;
                })
        }
    }
});
