'use strict';
var router = require('express').Router();
var _ = require('lodash');

// albums api
var mongoose = require('mongoose');
var Album = mongoose.model('Album');

// get all albums (optionally sort by parameters)
router.get('/', function(req, res, next) {
    Album.find({
        storeExclusive: {$ne: true}
        }).exec()
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

// get album by name
router.get('/name/:name', function(req, res, next) {
    var name = req.params.name.split('%20').join('');
    Album.findOne({title: name}).exec()
        .then(function(data) {
            if (!data) res.send('not found');
            else res.json(data);
        })
        .then(null, next);
});

router.get('/:id/populated', function(req, res, next) {
    Album.findById(req.params.id).populate('artist genre').exec()
        .then(function(alb) {
            res.json(alb);
        })
        .then(null, next);
});

// get all albums populated with artists and genre
router.get('/populated', function(req, res, next) {
    Album.find({
        storeExclusive: {$ne: true}
    }).populate('artist genre').exec()
        .then(function(albums) {
            res.json(albums);
        })
        .then(null, next);
});

// get album by id and save for later
router.param('id', function(req, res, next, id) {
    Album.findById(id).populate('songs reviews artist').exec()

        .then(function(album) {
            if (!album) throw Error('Not Found');
            req.album = album;
            next();
        })
        .then(null, function(e) {
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
        });
});

// get album by artist
router.get('/artist/:artistId', function(req, res, next) {
    Album.find({
            artist: req.params.artistId
        }).exec()
        .then(function(albums) {
            res.json(albums);
        })
        .then(null, next);
});

// get one album (by its id)
router.get('/:id', function(req, res) {
    res.json(req.album);
});

// update one album (and return it to frontend)
router.put('/:id', function(req, res, next) {
    _.extend(req.album, req.body);
    req.album.save().then(function(album) {
            res.json(album);
        })
        .then(null, next);
});

// delete one album
router.delete('/:id', function(req, res, next) {
    req.album.remove().then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

module.exports = router;