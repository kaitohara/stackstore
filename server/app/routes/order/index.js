var router = require('express').Router();
var order = require('./order.router');

router.use('/', order);

module.exports = router;

