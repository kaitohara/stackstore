var router = require('express').Router();
var order = require('./review.router');

router.use('/', order);

module.exports = router;

