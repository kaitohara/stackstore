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
        e.status = 404;
        next(e);
    });
}
router.get('/:id', getById, function(req, res) {
    res.json(req.album)
})
// get one album (by its id)

////test for multiple
// router.get('/:id', function(req, res) {
//     console.log('iddddd', req.params.id.split())
//     Album.find({
//         '_id': { $in: req.params.id.split()}
//         }).exec()
//     .then(function(album){
//         console.log('resultttt',album)
//         res.json(album)
//     })
//     // res.json(req.album);
// });

// update one album (and return it to frontend)
router.put('/:id', function(req, res, next) {
    Album.findById(req.params.id).exec()
    .then(function(album) {
        // update the album -- and return updated album
        for (var key in req.body) {
            album[key] = req.body[key];
        }
        album.save(function(e) {
            if (e) return next(e);
            res.json(album);
        });
    })
    .then(null, function(e) {
        e.status = 404;
        next(e);
    });
});

// delete one album
router.delete('/:id', function(req, res, next) {
    Album.findByIdAndRemove(req.params.id).exec()
    .then(function() {
        res.status(204).end();
    })
    .then(null, function(e) {
        e.status = 404;
        next(e);
    });
});

module.exports = router;