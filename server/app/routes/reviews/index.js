'use strict';

var router = require('express').Router();
// var order = require('./review.router');
var mongoose = require('mongoose');
var Review = mongoose.model('Review');

// router.use('/', order);

router.get('/', function(req, res){
	Review.find().exec()
		.then(function(reviews){
			res.json(reviews)
		})
});

// get song by id and save for later
//searchIds is an array to allow for searching multiple Ids
function getById (req, res, next) {
	var searchIds = req.params.id.split(',');
	Review.find({'_id': {$in:searchIds}}).exec()
	// Review.findById(req.params.id).exec()
	.then(function(review){
		req.review = review;
		next();
	})
	.then(null, function(e) {
		e.status = 404;
		next(e);
	})
}

router.get('/:id', getById, function(req, res){
	res.json(req.review)
})


module.exports = router;

