app.config(function($stateProvider) {

  // Register our *about* state.
  $stateProvider
    .state('cart', {
      url: '/cart',
      controller: 'CartController',
      templateUrl: 'js/user/cart/cart.html',
      resolve: {
        cart: function(AuthService, CartFactory){
          return AuthService.getLoggedInUser().then(function(user) {
            console.log('user', user)
            return CartFactory.getUserCart(user).then(function(data){
              return data
            })
          })
        }
      }
    })
});

app.controller('CartController', function($scope, cart) {
  console.log(cart)
  $scope.cart = cart;
});

app.factory('CartFactory', function($http) {
  return {
    getUser: function(){
      return $http.get("api/members/me")
      .then(function(res){
        console.log(res.data)
        return res.data
      })
    },
    getCart: function(id){
      return $http.get("api/users/" + id + '/cart')
      .then(function(res) {
        return res.data
      })
    }, 
    getUserCart: function(user){
      return $http.get("api/users/" + user._id + '/cart')
      .then(function(res) {
        console.log('fuckin a', user, res.data)
        return res.data
      })
    }
  }
})