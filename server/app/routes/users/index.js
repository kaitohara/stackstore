'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
    User.find(req.query).exec()
        .then(function(users) {
            res.json(users);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    User.create(req.body)
        .then(function(user) {
            res.status(201).json(user)
        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    User.findById(id).exec()
        .then(function(user) {
            if (!user) throw Error('Not Found');
            req.user = user;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:id', function(req, res) {
    res.json(req.user)
});

router.get('/:id/profile', function(req, res, next) {
    User.deepPopulate(req.user, [
        'pastOrderList',
        'pastOrderList.albums.album',
        'pastOrderList.songs.song',
        'pastOrderList.albums.album.artist',
        'pastOrderList.songs.song.artist',
        'pastOrderList.albums.album.genre',
        'pastOrderList.songs.song.genre'
    ], function(err, user) {
        if (err) next(err)
        res.json(user)
    })
});

router.get('/:id/cart', function(req, res) {
    User.deepPopulate(req.user, [
        'cart',
        'cart.albums.album',
        'cart.songs.song',
        'cart.albums.album.artist',
        'cart.songs.song.artist',
        'cart.albums.album.genre',
        'cart.songs.song.genre',
        'cart.songs.song.album'
    ], function(err, user) {
        if (err) next(err)
        res.json(user.cart)
    })
});

router.put('/:id', function(req, res, next) {
    _.extend(req.user, req.body);
    req.user.save()
        .then(function(user) {
            res.json(user)
        })
        .then(null, next);
})

router.delete('/:id', function(req, res, next) {
    req.user.remove()
        .then(function() {
            res.status(204).end()
        })
        .then(null, next);
})