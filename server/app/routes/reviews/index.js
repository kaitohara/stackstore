'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var _ = require('lodash');

var review = mongoose.model('Review');

///multiple reviews - for Get routes
router.get('/multiple', function(req, res, next){
    var searchIds = req.query.ids.split(',');
    review
       .find({'_id': {$in:searchIds}}).exec()
       .then(function(reviewItems){
            if (!reviewItems.length) throw Error('Not Found');
            res.json(reviewItems);
       })
       .then(null, function(e){
            // invalid ids sometimes throw cast error
            if (e.name === "CastError" || e.message === "Not Found") e.status = 404;
            next(e);
       });
});

// return all reviews (optional search parameters)
router.get('/', function(req, res, next){
    review.find(req.query).exec()
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
    _.extend(req.reviewItem, req.body);
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
