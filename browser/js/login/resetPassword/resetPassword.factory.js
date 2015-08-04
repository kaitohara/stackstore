app.factory('ResetPasswordFactory', function($http){
    function transformData (response) {
        return response.data;
    }

    return {
        resetUser: function(email) {
            return $http.put('/api/users/reset/' + email)
                .then(transformData)
                .then(function(user){
                    return user;
                })
                .then(null, function(err){
                    return err;
                })
        }
    }
})
