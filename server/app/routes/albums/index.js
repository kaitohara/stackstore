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
        res.status(201).json(savedAlbum);
    });
});


// get album by id and save for later
// attach album to request
router.param('id', function(req, res, next, id) {
    Album.findById(id).exec()
        .then(function(album) {
            if (!album) throw Error();
            req.album = album;
            next();
        })
        .then(null, function(e) {
            e.message = "Not Found";
            e.status = 404;
            next(e);
        });
});

// get album by artist
router.get('/artist/:artistId', function(req, res){
    Album.find({artist:req.params.artistId}).exec()
    .then(function(albums){
        res.json(albums);
    });
});

// get one album (by its id)
router.get('/:id', function(req, res) {
    res.json(req.album);
});

// update one album (and return it to frontend)
router.put('/:id', function(req, res, next) {
    for (var key in req.body) {
        req.album[key] = req.body[key];
    }
    req.album.save().then(function(album) {
        res.json(album);
    });
});

// delete one album
router.delete('/:id', function(req, res, next) {
    req.album.remove().then(function() {
        res.status(204).end();
    });
});

module.exports = router;
