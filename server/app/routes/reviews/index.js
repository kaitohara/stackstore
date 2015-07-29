'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var review = mongoose.model('Review');


router.param('reviewId', function(req, res, next, reviewId){
    review.findById(reviewId)
        .then(function(reviewItem){
            req.reviewItem = reviewItem;
            next();
        })
        .then(null, function(err){
            next(err);
        });
});

router.get('/', function(req, res, next){
    review.find().exec()
        .then(function(reviewItems){
            res.json(reviewItems);
        })
        .then(null, function(err){
            next(err);
        })
});

router.get('/:reviewId', function(req, res){
    res.json(req.reviewItem);
});

router.put('/:reviewId', function(req, res, next){
    req.order.save()
        .then(function(reviewItem){
            res.json(reviewItem);
        })
        .then(null,next);
});

router.post('/', function(req, res, next){
    review
        .create(req.body)
        .then(function(reviewItem){
            if(!reviewItem) throw new Error();
            else return reviewItem;
        })
        .then(null, function(err){
            next(err);
        });
});

module.exports = router;
