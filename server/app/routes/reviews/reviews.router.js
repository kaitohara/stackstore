'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');

var review = mongoose.model('Review');

router.param('reviewIds', function(req, res, next, reviewIds){

    var searchIds = reviewIds.split(',');
    review.find({'_id': {$in:searchIds}})
        .then(function(reviewItems){
            req.reviewItems = reviewItems;
            next();
        })
        .then(null, function(err){
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

router.get('/:reviewIds', function(req, res){
    res.json(req.reviewItems);
});

module.exports = router;
