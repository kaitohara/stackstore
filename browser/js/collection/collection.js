'user strict'

app.config(function($stateProvider) {
  $stateProvider.state('collection', {
    url: '/collection',
    templateUrl: '/js/collection/collection.html',
    controller: 'CollectionController',
    resolve: {
      user: (AuthService, ProfileFactory) =>
        AuthService.getLoggedInUser()
        .then(function(user) {
          return ProfileFactory.getUserInfo(user)
        })
    }
  })
});

app.controller('CollectionController', function($scope, user) {
  $scope.collection = user.pastOrderList;
});