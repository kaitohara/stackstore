'use strict';

var router = require('express').Router();

router.use('/review', require('./review.router.js'));
router.use('/reviews', require('./reviews.router.js'));

module.exports = router;
