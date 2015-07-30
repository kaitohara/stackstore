'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var review = mongoose.model('Review');

//single - for PUT and Delete routes
router.param('reviewId', function(req ,res, next, reviewId){
    review
        .findById(reviewId)
        .exec()
        .then(function(reviewItem){
            if(!reviewItem) throw Error();
            else req.reviewItem = reviewItem;
                next();
        })
        .then(null, function(err) {
            err.status=404;
            next(err);
        });
});

//single reviews by Id
router.get('/:reviewId', function(req, res){
     res.json(req.reviewItem);
});

//single post by Id
router.post('/', function(req, res, next){
    review
        .create(req.body)
        .then(function(reviewItem){
            if(!reviewItem) throw new Error();
            else res.status(201).json(reviewItem);
        })
        .then(null, next);
});

//single update by Id
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

//single delete by Id
router.delete('/:reviewId', function(req, res, next){
    req.reviewItem.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});

module.exports = router;
