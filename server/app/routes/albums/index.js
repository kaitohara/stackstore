'use strict';
var router = require('express').Router();

// albums api
var mongoose = require('mongoose');
var Album = mongoose.model('Album');

// get all albums (optionally sort by parameters)
router.get('/', function(req, res, next) {

    // allows for search parameters
    var query = {};
    if (req.query) {
        query = req.query;
    }

    Album.find(query).exec()
    .then(function(albums) {
        res.json(albums);
    })
    .then(null, next);
});

// post a new album (sends it back to frontend)
router.post('/', function(req, res, next) {
    var album = new Album(req.body);
    album.save(function(err, savedAlbum) {
        if (err) return next(err);
        res.json(savedAlbum);
    });
});

// get album by id and save for later
function getById (req, res, next) {
    Album.findById(req.params.id).exec()
    .then(function(album) {
        req.album = album;
        next();
    })
    .then(null, function(e) {
        // cast error was thrown in the express assessment when given
        //  invalid id - might be problem here too (delete this if not)
        if (e.name === 'CastError') res.status(404).end();
        else next(e);
    });
}

// get one album (by its id)
router.get('/:id', getById, function(req, res) {
    res.json(req.album);
});

// update one album (and return it to frontend)
router.put('/:id', function(req, res, next) {
    Album.findByIdAndUpdate(req.params.id, req.body).exec()
    .then(function(album) {
        res.json(album);
    })
    .then(null, next);
});

// delete one album
router.delete('/:id', function(req, res, next) {
    Album.findByIdAndRemove(req.params.id).exec()
    .then(function() {
        res.status(204).end();
    })
    .then(null, next);
});

module.exports = router;