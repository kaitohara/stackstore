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
        .then(null, function(err){
            next(err);
        });
});

router.param('reviewId', function(req, res, next, reviewId){
    review.findById(reviewId)
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

router.get('/:reviewId', function(req, res){
    res.json(req.reviewItem);
});

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
    req.reviewItem.remove().then(function() {
        res.status(204).end();
    });
});

router.post('/', function(req, res, next){
    review
        .create(req.body)
        .then(function(reviewItem){
            if(!reviewItem) throw new Error();
            else res.status(201).json(reviewItem);
        })
        .then(null, function(err){
            next(err);
        });
});

module.exports = router;
