'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./users'));
router.use('/artists', require('./artists'));
router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));
router.use('/genres', require('./genres'));
router.use('/stores', require('./stores'));

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
    res.status(404).send("Not Found");
});