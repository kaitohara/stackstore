'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var order = mongoose.model('Order');

router.param('orderId', function(req, res, next, orderId){
    order.findById(orderId)
        .exec()
        .then(function(orderItem){
            if(!orderItem) throw new Error();
            else {
                req.orderItem = orderItem;
                next();
            }
        })
        .then(null, function(err) {
            next(err);
        });
});

router.get('/:orderId', function(req, res){
    res.json(req.orderItem);
});

router.get('/', function(req, res, next){
    order.find().exec()
        .then(function(orderItems){
            res.json(orderItems);
        })
        .then(null, function(err){
            next(err);
        })
})

router.put('/:orderId', function(req, res, next){
    req.order.save()
        .then(function(orderItem){
            res.json(orderItem);
        })
        .then(null,next);
});

router.post('/', function(req, res, next){
    order
        .create(req.body)
        .then(function(orderItem){
            if(!orderItem) throw new Error();
            else return orderItem;
        })
        .then(null, function(err){
            next(err);
        });
});

module.exports = router;

