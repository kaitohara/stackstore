'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var OrderModel = mongoose.model('Order');

var googleId;

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        console.log('got this from google', profile);

        googleId = profile.id;

        UserModel.findOne({ 'google.id': profile.id }).exec()
            .then(function (user) {

                if (user) {
                    return user;
                } else {
                    return OrderModel.create({}).then(function(order) {
                        return UserModel.create({
                            google: {
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
                console.error('Error creating views from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            console.log('have this on the req', req.session);
            // attach cart to user
            UserModel.findOne({'google.id': googleId})
                .then(function(user) {
                    if (req.session.cart) {
                        user.cart = req.session.cart;
                        user.save().then(function(){
                            res.redirect('/additional');
                        });
                    } else {
                        res.redirect('/additional');
                    }
                });
        });

};
