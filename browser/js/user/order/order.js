app.directive('order', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/user/order/order.html',
    scope: {
      order: '=model'
    },
    controller: "OrderController"
  }
})

app.controller('OrderController', function($scope, OrderFactory) {
  console.log("order", $scope.order)
  $scope.removeSong = function(pullId) {
    OrderFactory.removeSong($scope.order._id, pullId).then(function(res) {
      $scope.order = res.data;
    })
  }
  $scope.removeAlbum = function(pullId) {
    OrderFactory.removeAlbum($scope.order._id, pullId).then(function(res) {
      $scope.order = res.data;
    })
  }
  $scope.addSong = function(pushId, qty, price) {
    OrderFactory.removeSong($scope.order._id, pushId, qty, price).then(function(res) {
      $scope.order = res.data;
    })
  }
  $scope.addAlbum = function(pushId, qty, price) {
    OrderFactory.removeAlbum($scope.order._id, pushId, qty, price).then(function(res) {
      $scope.order = res.data;
    })
  }
})

app.factory('OrderFactory', function($http) {
  return {
    removeSong: function(orderId, pullId) {
      return $http.put('/api/orders/' + orderId + '/removeSong', {
          pullId: pullId
        })
        .then(function() {
          return $http.get('/api/orders/' + orderId)
        })
    },
    removeAlbum: function(orderId, pullId) {
      return $http.put('/api/orders/' + orderId + '/removeAlbum', {
          pullId: pullId
        })
        .then(function() {
          return $http.get('/api/orders/' + orderId)
        })
    },
    addSong2Cart: function(orderId, songId, qty, price) {
      console.log('song added ', orderId, songId)
      return $http.post('/api/orders/' + orderId + '/addSong', {
        // orderId: orderId,
        songId: songId,
        price: price
      }).then(function() {
        return $http.get('/api/orders/' + orderId)

        // return console.log('added succesfully?!')
      })
    },
    addAlbum2Cart: function(orderId, albumId, qty, price) {
      console.log('album added ', orderId, albumId)
      return $http.post('/api/orders/' + orderId + '/addAlbum', {
        // orderId: orderId,
        albumId: albumId,
        price: price
      }).then(function() {
        return $http.get('/api/orders/' + orderId)

        // return console.log('added succesfully?!')
      })
    }
  }
})