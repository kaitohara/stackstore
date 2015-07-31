'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var emailer = require('../../email');

var path = require('path');

router.get('/activate/:id', function(req, res, next) {

})

router.get('/', function(req, res, next) {
    User.find().exec()
        .then(function(users) {
            res.json(users);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    User.create(req.body)
        .then(function(user) {

            console.log(user);
            emailer(user.email,user.email);
            res.status(201).json(user)

        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    User.findById(id).exec()
        .then(function(user) {
            if (!user) throw Error()
            req.user = user
            next()
        })
        .then(null, function(err) {
            err.message = "Not Found"
            err.status = 404
            next(err)
        });
})

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
        'cart.songs.song.genre'
    ], function(err, user) {
        if (err) next(err)
        res.json(user)
    })
});

router.put('/:id', function(req, res, next) {
    for (var key in req.body) {
        req.user[key] = req.body[key]
    }
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

