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

router.post('/removeSong', function(req, res, next){
    Order.findOneAndUpdate({_id:req.body.orderId},{$pull:{'songs':{'_id': req.body.pullId}}}).exec()
        .then(function(){
            // Order.findById(req.params.id).exec().then(function(order){
            res.status(201).send('')
            // })
        })
        .then(null, next);
})

router.post('/removeAlbum', function(req, res, next){
    Order.findOneAndUpdate({_id:req.body.orderId},{$pull:{'albums':{'_id': req.body.pullId}}}).exec()
        .then(function(){
            // Order.findById(req.params.id).exec().then(function(order){
            res.status(201).send('')
            // })
        })
        .then(null, next);
})

//add song to a user's cart
router.post('/addSong', function(req, res, next){
    Order.findOneAndUpdate({_id:req.body.orderId}, {$push:{'songs': {'song': req.body.songId, 'price': req.body.price, 'quantity': 1}}}).exec()
        .then(function(){
            res.status(200).send('')
        })
        .then(null, next);
})

//add album to a user's cart
router.post('/addAlbum', function(req, res, next){
    Order.findOneAndUpdate({_id:req.body.orderId}, {$push:{'albums': {'album': req.body.albumId, 'price': req.body.price, 'quantity': 1}}}).exec()
        .then(function(){
            res.status(200).send('')
        })
        .then(null, next);
})

// router.post('/add')

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
