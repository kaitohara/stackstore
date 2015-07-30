'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var Order = mongoose.model('Order');

router.get('/', function(req, res, next){
    Order.find().exec()
        .then(function(orderItems){
            res.json(orderItems);
        })
        .then(null, next);
});

router.param('orderId', function(req, res, next, orderId){
    Order.findById(orderId)
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
    req.orderItem.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

router.post('/', function(req, res, next){
    Order
        .create(req.body)
        .then(function(orderItem){
            if(!orderItem) throw new Error();
            else res.status(201).json(orderItem);
        })
        .then(null, next);
});

<<<<<<< HEAD
module.exports = router;
=======
// post because it is easier to send data
router.post('/multi/id', function(req, res, next) {
    Order.find({'_id': {$in: req.body}})
        .then(function(orders) {
            res.json(orders);
        })
        .then(null, next);
});

module.exports = router;
>>>>>>> dcef9cdfde21bcf0ba5d5e81f6284c224c79fe6e
