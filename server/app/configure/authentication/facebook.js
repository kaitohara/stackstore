'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var OrderModel = mongoose.model('Order');

var facebookId;

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        profileFields: ['id', 'displayName', 'emails']
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        facebookId = profile.id;

        UserModel.findOne({ 'facebook.id': profile.id }).exec()
            .then(function (user) {

                if (user) {
                    return user;
                } else {
                    return OrderModel.create({}).then(function(order) {
                        UserModel.create({
                            facebook: {
                                id: profile.id
                            },
                            email: profile.emails[0].value,
                            name: profile.displayName,
                            cart: order
                        });
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating views from Facebook authentication', err);
                done(err);
            });

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            // attach cart to user
            UserModel.findOne({'facebook.id': facebookId})
                .then(function(user) {
                    if (req.session.cart) {
                        user.cart = req.session.cart;
                        user.save().then(function(){
                            res.redirect('/');
                        });
                    } else {
                        res.redirect('/');
                    }
                });
        });

};
