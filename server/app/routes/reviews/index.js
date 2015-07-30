'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var review = mongoose.model('Review');


///multiple reviews - for Get routes
router.get('/multiple', function(req, res, next){
    console.log(req.query);
    res.json(req.query);
    //var searchIds = req.query.ids.split(',');
    //review
    //    .find({'_id': {$in:searchIds}})
    //    .then(function(reviewItems){
    //        req.reviewItems = reviewItems;
    //        next();
    //    })
    //    .then(null, function(err){
    //        err.status=404;
    //        next(err);
    //    });
});

//single review - for PUT, Post Delete routes
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

router.get('/multiple/:reviewIds', function(req, res){
    res.json(req.reviewItems);
});

//single reviews by Id
router.get('/single/:reviewId', function(req, res){
    console.log(req.reviewItem);
    res.json(req.reviewItem);
});

//single post by Id
router.post('/single/', function(req, res, next){
    review
        .create(req.body)
        .then(function(reviewItem){
            if(!reviewItem) throw new Error();
            else res.status(201).json(reviewItem);
        })
        .then(null, next);
});

//single update by Id
router.put('/single/:reviewId', function(req, res, next){
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
router.delete('/single/:reviewId', function(req, res, next){
    req.reviewItem.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});


module.exports = router;
