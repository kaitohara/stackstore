'use strict';
var router = require('express').Router();
module.exports = router;

var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');

router.get('/', function(req, res, next) {

    // allows for search parameters
    var query = {};
    if (req.query) {
        query = req.query;
    }

    Artist.find(query).exec()
        .then(function(artists) {
            res.json(artists);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    Artist.create(req.body)
        .then(function(artist) {
            res.status(201).json(artist)
        })
        .then(null, next);
});

router.param('id', function(req, res, next, id) {
    Artist.findById(id).exec()
        .then(function(artist) {
            if (!artist) throw Error()
            req.artist = artist
            next()
        })
        .then(null, function(err) {
            err.message = "Not Found"
            err.status = 404
            next(err)
        });
})

router.get('/:id', function(req, res) {
    res.send(req.artist);
});

router.put('/:id', function(req, res, next) {
    for (var key in req.body) {
        req.artist[key] = req.body[key]
    }
    req.artist.save()
        .then(function(artist) {
            res.json(artist)
        })
        .then(null, next);
})

router.delete('/:id', function(req, res, next) {
    req.artist.remove()
        .then(function() {
            res.status(204).end()
        })
        .then(null, next);
})