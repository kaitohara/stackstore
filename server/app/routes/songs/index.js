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

// get song by id and save for later
function getById (req, res, next) {
    Song.findById(req.params.id).exec()
    .then(function(song) {
        req.song = song;
        next();
    })
    .then(null, function(e) {
        e.message = "Not Found";
        e.status = 404;
        next(e);
    });
}

// get one song (by its id)
router.get('/:id', getById, function(req, res) {
    res.json(req.song);
});

// update one song (and return it to frontend)
router.put('/:id', function(req, res, next) {
    Song.findById(req.params.id).exec()
    .then(function(song) {
        for (var key in req.body) {
            song[key] = req.body[key];
        }
        song.save(function(e) {
            if (e) return next(e);
            res.json(song);
        });
    })
    .then(null, function(e) {
        e.message = "Not Found";
        e.status = 404;
        next(e);
    });
});

// delete one song
router.delete('/:id', function(req, res, next) {
    Song.findByIdAndRemove(req.params.id).exec()
    .then(function() {
        res.status(204).end();
    })
    .then(null, function(e) {
        e.message = "Not Found";
        e.status = 404;
        next(e);
    });
});

module.exports = router;