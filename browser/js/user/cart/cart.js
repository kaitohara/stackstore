app.config(function($stateProvider) {

  // Register our *about* state.
  $stateProvider
    .state('cart', {
      url: '/cart',
      controller: 'CartController',
      templateUrl: 'js/user/cart/cart.html',
      resolve: {
        cart: (AuthService) =>
          AuthService.getCart()
      }
    })
});

app.controller('CartController', function($scope, cart) {
  console.log(cart)
  $scope.cart = cart;
});

app.factory('CartFactory', function($http) {
  return {}
})