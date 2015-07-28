'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res) {
    User.find().exec()
        .then(function(users) {
            res.json(users);
        })
});

router.post('/', function(req, res) {
    User.create(req.body)
        .then(function(user) {
            res.status(201).json(user)
        })
});

router.param('id', function(req, res, next, id) {
    User.findById(id).exec()
        .then(function(user) {
            if (!user) throw Error()
            req.user = user
            next()
        })
        .then(null, function(err) {
            err.message = "Not Found"
            err.status = 404
            next(err)
        });
})

router.get('/:id', function(req, res) {
    res.send(req.user);
});

router.put('/:id', function(req, res) {
    for (var key in req.body) {
        req.user[key] = req.body[key]
    }
    req.user.save().then(function(user) {
        res.json(user)
    })
})

router.delete('/:id', function(req, res) {
    req.book.remove().then(function() {
        res.status(204).end()
    })
})