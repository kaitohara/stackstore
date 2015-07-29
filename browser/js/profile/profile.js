app.config(function($stateProvider) {

  // Register our *about* state.
  $stateProvider.state('profile', {
    url: '/profile',
    controller: 'ProfileController',
    templateUrl: 'js/profile/profile.html',
    resolve: {
      user: function(AuthService, ProfileFactory) {
        return AuthService.getLoggedInUser()
          .then(function(currentUser) {
            return ProfileFactory.populateAll(currentUser)
          })
      }
    }
  });
});

app.controller('ProfileController', function($scope, user) {
  $scope.user = user;
});

app.factory('ProfileFactory', function($http) {
  return {
    populateAll: function(user) {
      console.log(user)
      return $http.get("api/users/" + user._id + '/profile')
        .then(function(res) {
          return res.data
        })
    }
  }
})