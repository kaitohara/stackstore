'use strict';
var router = require('express').Router();

// songs api
var mongoose = require('mongoose');
var Song = mongoose.model('Song');

// get all songs (optionally sort by parameters)
router.get('/', function(req, res, next) {

    // allows for search parameters
    var query = {};
    if (req.query) {
        query = req.query;
    }

    Song.find(query).exec()
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

// return songs populated with albums
router.get('/populated', function(req, res, next) {
    Song.find({}).populate('album artist genre').exec()
        .then(function(songs) {
            res.json(songs);
        })
        .then(null, next);
});

// get song by id and save for later
router.param('id', function(req, res, next, id) {
    var searchIds = id.split(',');
    Song.find({'_id': {$in:searchIds}}).exec()
        .then(function(song) {
            if (!song) throw Error();
            req.song = song;
            next();
        })
        .then(null, function(e) {
            e.message = "Not Found";
            e.status = 404;
            next(e);
        });
});

// get one song (by its id)
router.get('/:id', function(req, res) {
    res.json(req.song);
});

// update one song (and return it to frontend)
router.put('/:id', function(req, res, next) {
    for (var key in req.body) {
        req.song[key] = req.body[key];
    }
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