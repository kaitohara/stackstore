app.config(function($stateProvider) {

  // Register our *about* state.
  $stateProvider.state('profile', {
    url: '/profile',
    controller: 'ProfileController',
    templateUrl: 'js/profile/profile.html',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      }
    }
  });
});

app.controller('ProfileController', function($scope, user) {

  $scope.user = user;

});