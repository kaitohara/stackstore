'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');

var Order = mongoose.model('Order');

router.get('/', function(req, res, next){
    Order.find(req.query).exec()
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
            req.orderItem = orderItem;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:orderId', function(req, res){
    res.json(req.orderItem);
});

router.put('/:orderId', function(req, res, next){
    _.extend(req.orderItem, req.body);
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
    Order.create(req.body)
        .then(function(orderItem){
            if(!orderItem) throw new Error();
            else res.status(201).json(orderItem);
        })
        .then(null, next);
});

module.exports = router;
