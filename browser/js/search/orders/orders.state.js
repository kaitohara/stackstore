'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: 'js/search/orders/orders.search.html',
        controller: 'ordersCtrl',
        resolve: {
            order: function(Order, $stateParams) {
                return Order.getOrders($stateParams.id).then(function(data){
                  return data;
                });
            }
        }
    });
});
