'use strict';
var router = require('express').Router();
module.exports = router;

var mongoose = require('mongoose');

var genre = mongoose.model('Genre')

router.use('/genre', require('./genre'));

router.get('/', function (req, res){
	genre.find({}).exec()
		.then(function(data){
			res.json(data);
		})
		.then(null, function(err){
			res.json(err)
		})
})

router.get('/:genre', function (req, res){
	genre.find({name:req.params.genre}).exec()
		.then(function(data){
			res.json(data);
		})
		.then(null, function(err){
			res.json(err)
		})
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
}); 
