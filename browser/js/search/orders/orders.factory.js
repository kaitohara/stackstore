'use strict';

app.factory('Orders', function($http){
    var url='/api/orders';
    return {
        getOrders: function(){
            return $http.get(url)
                        .then(function(res){
                            return res.data
                });
        }
    }
});
