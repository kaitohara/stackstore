'use strict';
var router = require('express').Router();
var _ = require('lodash');

// songs api
var mongoose = require('mongoose');
var Song = mongoose.model('Song');

// multiple songs - for Get routes
router.get('/multiple', function(req, res, next){
    var searchIds = req.query.ids.split(',');
    Song.find({'_id': {$in:searchIds}}).exec()
       .then(function(reviewItems){
        if (!reviewItems.length) throw Error('Not Found');
           res.json(reviewItems);
       })
       .then(null, function(e){
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
       });
});

// get all songs (optionally sort by parameters)
router.get('/', function(req, res, next) {
    Song.find(req.query).exec()
        .then(function(songs) {
            res.json(songs);
        })
        .then(null, next);
});

// post a new song (sends it back to frontend)
router.post('/', function(req, res, next) {
    var song = new Song(req.body);
    song.save(function(err, savedSong) {
        if (err) return next(err);
        res.status(201).json(savedSong);
    });
});

router.put('/multi', function(req, res, next) {
    Song.remove({_id: { $in: req.body}}).exec()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

// return songs populated with albums
router.get('/populated', function(req, res, next) {
    Song.find({}).populate('album artist genre').exec()
        .then(function(songs) {
            res.json(songs);
        })
        .then(null, next);
});

router.get('/:id/populated', function(req, res, next) {
    Song.deepPopulate(req.song, [
        'album',
        'genre',
        'artist',
        'reviews',
        'reviews.author'
        ], function(e, song) {
            if (e) next(e);
            res.json(song);
        });
});

// get song by id and save for later
router.param('id', function(req, res, next, id) {
    Song.findById(id).exec()
        .then(function(song) {
            if (!song) throw Error('Not Found');
            req.song = song;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

// get one song (by its id)
router.get('/:id', function(req, res) {
    res.json(req.song);
});

// update one song (and return it to frontend)
router.put('/:id', function(req, res, next) {
    _.extend(req.song, req.body);
    req.song.save()
        .then(function(song) {
            res.json(song);
        })
        .then(null, next);
});

// delete one song
router.delete('/:id', function(req, res, next) {
    req.song.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

module.exports = router;
