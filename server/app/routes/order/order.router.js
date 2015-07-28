'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var order = mongoose.model('Order');

router.get('/', function(req, res, next){
    order.find().exec()
        .then(function(orderItems){
            res.json(orderItems);
        })
        .then(null, function(err){
            next(err);
        });
});

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
            err.message = "Not Found";
            err.status = 404;
            next(err);
        });
});

router.get('/:orderId', function(req, res){
    res.json(req.orderItem);
});

router.put('/:orderId', function(req, res, next){
    for (var key in req.body) {
        req.orderItem[key] = req.body[key];
    }
    req.orderItem.save()
        .then(function(orderItem){
            res.json(orderItem);
        })
        .then(null,next);
});

router.delete('/:orderId', function(req, res, next){
    req.orderItem.remove().then(function() {
        res.status(204).end();
    });
});

router.post('/', function(req, res, next){
    order
        .create(req.body)
        .then(function(orderItem){
            if(!orderItem) throw new Error();
            else res.status(201).json(orderItem);
        })
        .then(null, function(err){
            next(err);
        });
});

module.exports = router;
