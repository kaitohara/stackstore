'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose')
var Order = mongoose.model('Order')

// router.use('/members', require('./members'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./users'));
router.use('/artists', require('./artists'));
router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));
router.use('/genres', require('./genres'));
router.use('/stores', require('./stores'));

router.get('/cart', function(req, res) {
  if (req.user) {
    req.session.cart = req.user.cart
    res.json(req.session.cart)
  } else if (req.session.cart) {
    res.json(req.session.cart)
  } else {
    Order.create({}).then(function(newOrder) {
      req.session.cart = newOrder._id
      res.json(req.session.cart)
    })
  }
})

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
  res.status(404).send("Not Found");
});