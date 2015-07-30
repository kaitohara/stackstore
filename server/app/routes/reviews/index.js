'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var review = mongoose.model('Review');


///multiple reviews - for Get routes
router.get('/multiple', function(req, res, next){
    var searchIds = req.query.ids.split(',');
    review
       .find({'_id': {$in:searchIds}}).exec()
       .then(function(reviewItems){
           res.json(reviewItems);
       })
       .then(null, function(err){
           err.status = 404;
           next(err);
       });
});

// return all reviews (optional search parameters)
router.get('/', function(req, res, next){
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

//review - for PUT, Post Delete routes
router.param('reviewId', function(req ,res, next, reviewId){
    review
        .findById(reviewId)
        .exec()
        .then(function(reviewItem){
            console.log('what is this single review', reviewItem);
            if(!reviewItem) throw Error();
            else req.reviewItem = reviewItem;
            next();
        })
        .then(null, function(err) {
            err.status=404;
            next(err);
        });
});

// reviews by Id
router.get('/:reviewId', function(req, res){
    res.json(req.reviewItem);
});

//post by Id
router.post('/', function(req, res, next){
    review
        .create(req.body)
        .then(function(reviewItem){
            if(!reviewItem) throw new Error();
            else res.status(201).json(reviewItem);
        })
        .then(null, next);
});

//update by Id
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

//delete by Id
router.delete('/:reviewId', function(req, res, next){
    req.reviewItem.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});


module.exports = router;
