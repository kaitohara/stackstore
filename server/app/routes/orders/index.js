'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');

var Order = mongoose.model('Order');
var emailer = require('../../email');

router.post('/checkout/:email/:cart', function(req, res, next){
    var params = [
        req.params.email
        , req.params.email
        , 'Order Confirmation'
        , 'Thank you for ordering from Stackify'
        , req.params.cart
    ];
    emailer('order', params);
    res.status(200).end();

});
router.get('/', function(req, res, next) {
    Order.find(req.query).exec()
        .then(function(orderItems) {
            res.json(orderItems);
        })
        .then(null, next);
});

router.param('orderId', function(req, res, next, orderId) {
    Order.findById(orderId)
        .exec()
        .then(function(orderItem) {
            if (!orderItem) throw new Error();
            req.orderItem = orderItem;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:orderId', function(req, res, next) {
    Order.deepPopulate(req.orderItem, [
        'albums.album',
        'songs.song',
        'albums.album.artist',
        'songs.song.artist',
        'albums.album.genre',
        'songs.song.genre',
        'songs.song.album',
        'songs.song.album.genre'
    ], function(err, order) {
        if (err) next(err)
        res.json(order)
    })
})

router.put('/:orderId/removeSong', function(req, res, next) {
    var removeIndex = null;
    req.orderItem.songs.forEach(function(song, index) {
        if (song.id === req.body.pullId)
            removeIndex = index
    })
    if (removeIndex !== null)
        req.orderItem.songs.splice(removeIndex, 1)
    else throw Error()
    req.orderItem.save()
        .then(function(orderItem) {
            res.json(orderItem)
        })
        .then(null, next);
})

router.put('/:orderId/removeAlbum', function(req, res, next) {
    var removeIndex = null;
    req.orderItem.albums.forEach(function(album, index) {
        if (album.id === req.body.pullId)
            removeIndex = index
    })
    if (removeIndex !== null)
        req.orderItem.albums.splice(removeIndex, 1)
    else throw Error()
    req.orderItem.save()
        .then(function(orderItem) {
            res.json(orderItem)
        })
        .then(null, next);
})

//add song to a user's cart
router.put('/:orderId/addSong', function(req, res, next) {
    var duplicated = req.orderItem.songs.some(function(song) {
        return song.song.equals(req.body.songId)
    })

    if (duplicated)
        res.status(304).send("duplicate item")
    else {
        req.orderItem.songs.push({
            'song': req.body.songId,
            'price': req.body.price,
            'quantity': 1
        })
        req.orderItem.save()
            .then(function(orderItem) {
                res.json(orderItem);
            })
            .then(null, next);
    }
})

//add album to a user's cart
router.put('/:orderId/addAlbum', function(req, res, next) {
    var duplicated = req.orderItem.albums.some(function(album) {
        return album.album.equals(req.body.albumId)
    })

    if (duplicated)
        res.status(304).json("duplicate item")
    else {
        req.orderItem.albums.push({
            'album': req.body.albumId,
            'price': req.body.price,
            'quantity': 1
        })
        req.orderItem.save()
            .then(function(orderItem) {
                console.log(orderItem.totalPrice)
                res.json(orderItem);
            })
            .then(null, next);
    }
})

router.put('/:orderId', function(req, res, next) {
    _.extend(req.orderItem, req.body);
    req.orderItem.save()
        .then(function(orderItem) {
            res.json(orderItem);
        })
        .then(null, next);
});

router.delete('/:orderId', function(req, res, next) {
    req.orderItem.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Order.create(req.body)
        .then(function(orderItem) {
            if (!orderItem) throw new Error();
            else res.status(201).json(orderItem);
        })
        .then(null, next);
});


module.exports = router;
