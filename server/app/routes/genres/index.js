'use strict';
var router = require('express').Router();
module.exports = router;

var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');

// get all genres
router.get('/', function(req, res) {
	Genre.find(req.query).exec()
		.then(function(data) {
			res.json(data);
		})
		.then(null, function(err) {
			res.json(err);
		});
});

// get genre by name
router.get('/:name', function(req, res, next) {
	Genre.findOne({name: req.params.name}).exec()
		.then(function(data) {
			res.json(data);
		})
		.then(null, next);
});

// get genre by id
router.get('/id/:id', function(req, res, next) {
	Genre.findById(req.params.id).exec()
		.then(function(genre) {
			res.json(genre);
		})
		.then(null, next);
});

// make new genre
router.post('/', function(req, res, next) {
    Genre.create(req.body)
        .then(function(genre) {
            res.status(201).json(genre);
        })
        .then(null, next);
});