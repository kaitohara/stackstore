'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');

router.get('/', function(req, res, next) {
    Artist.find(req.query).exec()
        .then(function(artists) {
            res.json(artists);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Artist.create(req.body)
        .then(function(artist) {
            res.status(201).json(artist);
        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    Artist.findById(id).exec()
        .then(function(artist) {
            if (!artist) throw Error('Not Found');
            req.artist = artist;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

router.get('/:id', function(req, res) {
    res.send(req.artist);
});

router.put('/:id', function(req, res, next) {
    _.extend(req.artist, req.body);
    req.artist.save()
        .then(function(artist) {
            res.json(artist);
        })
        .then(null, next);
});

router.delete('/:id', function(req, res, next) {
    req.artist.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});