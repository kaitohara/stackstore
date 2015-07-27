'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));

router.use('/genre', require('./genre'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
