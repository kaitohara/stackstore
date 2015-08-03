app.config(function($stateProvider) {

  // Register our *about* state.
  $stateProvider
    .state('cart', {
      url: '/cart',
      controller: 'CartController',
      templateUrl: 'js/user/cart/cart.html',
      resolve: {
        cart: (AuthService, CartFactory) =>
          AuthService.getLoggedInUser()
          .then(function(user) {
            return CartFactory.getUserCart(user)
          })
      }
    })

});
app.controller('CartController', function($scope, cart) {
  $scope.order = cart;

});

app.factory('CartFactory', function($http) {
  return {
    getUserCart: (user) =>
      $http.get("api/users/" + user._id + '/cart')
      .then(function(res) {
        return res.data
      })
  }
})