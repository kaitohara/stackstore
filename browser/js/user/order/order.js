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
  OrderFactory.setCurrentOrderID($scope.order._id);
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

app.factory('OrderFactory', function($http, Session) {
  var currentOrderID = 0
  return {
    setCurrentOrderID: function(orderID) {
      currentOrderID = orderID
    },
    getCurrentOrderID: function() {
      return currentOrderID
    },
    removeSong: function(orderId, pullId) {
      return $http.put('/api/orders/' + orderId + '/removeSong', {
          pullId: pullId
        })
        .then(function() {
          return $http.get('/api/orders/' + orderId)
        })
        .then(function(res) {
          Session.updateCart(res.data)
          return res
        })
    },
    removeAlbum: function(orderId, pullId) {
      return $http.put('/api/orders/' + orderId + '/removeAlbum', {
          pullId: pullId
        })
        .then(function() {
          return $http.get('/api/orders/' + orderId)
        })
        .then(function(res) {
          Session.updateCart(res.data)
          return res
        })
    },
    addSong2Cart: function(orderId, songId, qty, price) {
      console.log('song added ', orderId, songId)
      return $http.put('/api/orders/' + orderId + '/addSong', {
          songId: songId,
          price: price
        }).then(function() {
          return $http.get('/api/orders/' + orderId)

          // return console.log('added succesfully?!')
        })
        .then(function(res) {
          Session.updateCart(res.data)
          return res
        })
    },
    addAlbum2Cart: function(orderId, albumId, qty, price) {
      console.log('album added ', orderId, albumId)
      return $http.put('/api/orders/' + orderId + '/addAlbum', {
          albumId: albumId,
          price: price
        }).then(function() {
          return $http.get('/api/orders/' + orderId)

          // return console.log('added succesfully?!')
        })
        .then(function(res) {
          Session.updateCart(res.data)
          return res
        })
    }
  }
})