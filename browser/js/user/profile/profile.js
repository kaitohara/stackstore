app.config(function($stateProvider) {

  // Register our *about* state.
  $stateProvider
    .state('profile', {
      url: '/profile',
      abstract: true,
      controller: 'ProfileController',
      templateUrl: 'js/user/profile/profile.html',
      resolve: {
        user: (AuthService, ProfileFactory) =>
          AuthService.getLoggedInUser()
          .then(function(user) {
            return ProfileFactory.getUserInfo(user)
          })
      }
    })
    .state('profile.edit', {
      url: '',
      templateUrl: 'js/user/profile/edit.html'
    })
    .state('profile.orderHistory', {
      url: '/order-history',
      templateUrl: 'js/user/profile/order-history.html'
    })
});

app.controller('ProfileController', function($scope, user) {
  $scope.user = user;
  $scope.currentStatus = "all"
  $scope.changeOrderStatusView = function(newStatus) {
    $scope.currentStatus = newStatus;
  }
});

app.factory('ProfileFactory', function($http) {
  return {
    getUserInfo: (user) =>
      $http.get("api/users/" + user._id + '/profile')
      .then(function(res) {
        return res.data
      })
  }
})