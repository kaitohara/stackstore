'use strict';
var router = require('express').Router();
var _ = require('lodash');

var mongoose = require('mongoose');
var Store = mongoose.model('Store');

router.get('/', function(req, res, next) {
    Store.find(req.query).exec()
        .then(function(artists) {
            res.json(artists);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    console.log('posting and toasting');
    Store.create(req.body)
        .then(function(store) {
            res.status(201).json(store);
        })
        .then(null, next);
});


router.param('id', function(req, res, next, id) {
    Store.findById(id).exec()
        .then(function(store) {
            if (!store) throw Error('Not Found');
            req.store = store;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:id/populated', function(req, res, next) {
    Store.deepPopulate(req.store, [
        'albums',
        'songs',
        'songs.genre',
        'songs.artist',
        'songs.album'
        ], function(e, store) {
            if (e) next(e);
            res.json(store);
        });
});

router.get('/:id', function(req, res) {
    res.send(req.store);
});

router.put('/:id', function(req, res, next) {
    _.extend(req.store, req.body);
    req.store.save()
        .then(function(store) {
            res.json(store);
        })
        .then(null, next);
});

router.delete('/:id', function(req, res, next) {
    req.store.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

module.exports = router;