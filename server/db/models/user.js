'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Order = mongoose.model('Order')
var deepPopulate = require('mongoose-deep-populate');

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        // emails should have a @ symbol
        validate: /.+@.+/
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    name: {
        type: String
    },
    photo: {
        type: String,
        default: "http://lorempixel.com/200/200/people"
    },
    pastOrderList: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }]
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPassword: {
        type: Boolean,
        default: false
    },
    isSeller: {
        type: Boolean,
        default: false
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }
    var user = this
    if (!this.cart) {
        Order.create().then(function(newOrder) {
            user.cart = newOrder._id
        })
    }
    next();
});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

schema.method.setAdmin = function(isAdmin) {
    this.isAdmin = isAdmin
}

schema.method.finishCurrentOrder = function(newOrderStatus) {
    var user = this
    Order.findById(user.cart).exec().then(function(cart) {
        cart.orderStatus = newOrderStatus
        cart.date.finished = Date.now()
        cart.save()
            .then(function(savedCart) {
                user.pastOrderList.push(user.cart)
                Order.create().then(function(newCart) {
                    user.cart = newCart._id
                })
            })
    })
}

schema.plugin(deepPopulate);

mongoose.model('User', schema);