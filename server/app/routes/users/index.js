'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

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

router.get('/:id/profile', function(req, res) {
    User.findById(req.params.id)
        .populate('pastOrderList')
        .exec()
        .then(function(user) {
            var options2 = {
                path: 'pastOrderList.albums.album',
                model: 'Album'
            };
            User.populate(user, options2)
                .then(function(popedUser) {
                    var options3 = {
                        path: 'pastOrderList.songs.song',
                        model: 'Song'
                    };
                    User.populate(popedUser, options3)
                        .then(function(populatedUser) {
                            var options4 = {
                                path: 'pastOrderList.albums.album.artist pastOrderList.songs.song.artist',
                                model: 'Artist'
                            };
                            User.populate(populatedUser, options4)
                                .then(function(finalUser) {
                                    var options5 = {
                                        path: 'pastOrderList.albums.album.genre pastOrderList.songs.song.genre',
                                        model: 'Genre'
                                    };
                                    User.populate(finalUser, options5)
                                        .then(function(finalFinalUser) {
                                            res.json(finalFinalUser)
                                        })
                                })
                        })
                })
        })
});

router.get('/:id/cart', function(req, res) {
    var options1 = {
        path: ' cart',
        model: 'Order'
    };
    User.populate(req.user, options1)
        .then(function(popUser) {
            var options2 = {
                path: ' cart.albums.album',
                model: 'Album'
            };
            User.populate(popUser, options2)
                .then(function(popedUser) {
                    var options3 = {
                        path: ' cart.songs.song',
                        model: 'Song'
                    };
                    User.populate(popedUser, options3)
                        .then(function(populatedUser) {
                            var options4 = {
                                path: 'cart.albums.album.artist cart.songs.song.artist',
                                model: 'Artist'
                            };
                            User.populate(populatedUser, options4)
                                .then(function(finalUser) {
                                    res.json(finalUser)
                                })
                        })
                })
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