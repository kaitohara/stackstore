'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var review = mongoose.model('Review');

router.get('/', function(req, res, next){

    // allows for search parameters
    var query = {};
    if (req.query) {
        query = req.query;
    }

    review.find(query).exec()
        .then(function(reviewItems){
            res.json(reviewItems);
        })
        .then(null, next);
});

router.param('reviewId', function(req, res, next, reviewId){
	var searchIds = reviewId.split(',');
    review.find({'_id': {$in:searchIds}})
        .then(function(reviewItem){
            req.reviewItem = reviewItem;
            next();
        })
        .then(null, function(err){
            err.message = "Not Found";
            err.status = 404;
            next(err);
        });
});

// <<<<<<< HEAD
// // get song by id and save for later
// //searchIds is an array to allow for searching multiple Ids
// function getById (req, res, next) {
// 	var searchIds = req.params.id.split(',');
// 	Review.find({'_id': {$in:searchIds}}).exec()
// 	// Review.findById(req.params.id).exec()
// 	.then(function(review){
// 		req.review = review;
// 		next();
// 	})
// 	.then(null, function(e) {
// 		e.status = 404;
// 		next(e);
// 	})
// }
// =======
router.get('/:reviewId', function(req, res){
    res.json(req.reviewItem);
});
// >>>>>>> 194d00b0c09c4c6ba73c1ec8ffc91c534a368c05

router.put('/:reviewId', function(req, res, next){
    for (var key in req.body) {
        req.reviewItem[key] = req.body[key];
    }
    req.reviewItem.save()
        .then(function(reviewItem){
            res.json(reviewItem);
        })
        .then(null,next);
});

router.delete('/:reviewId', function(req, res, next){
    req.reviewItem.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

router.post('/', function(req, res, next){
    review
        .create(req.body)
        .then(function(reviewItem){
            if(!reviewItem) throw new Error();
            else res.status(201).json(reviewItem);
        })
        .then(null, next);
});

module.exports = router;
