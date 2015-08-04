'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Order = mongoose.model('Order')
var deepPopulate = require('mongoose-deep-populate');

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        // validate emails - from here: http://regexlib.com/REDetails.aspx?regexp_id=26
        validate: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
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
    active: {
        type: Boolean,
        default: false
    },
    // -- multitenancy
    isSeller: {
        type: Boolean,
        default: false
    },
    artistProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    resetPasswordCounter: {
        type: Number,
        default: 0
    },
    attemptedLogin: {
        type: Number,
        default: 0
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
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

    var user = this;
    if (!this.cart) {
        Order.create().then(function(newOrder) {
            user.cart = newOrder._id;
        });
    }
    next();
});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('tokenUrl', function(email){
    return this.constructor.encryptPassword(email, this.salt);
});

schema.method('verifyTokenUrl', function(token){
   return this.tokenUrl(this.email) === token;
});

schema.method('passwordResetUrl', function(){
    return this.constructor.encryptPassword(this.password + this.resetPasswordCounter, this.salt)
});

schema.method('increasePasswordResetCounter', function(){
    return this.resetPasswordCounter++;
});

schema.method('verifyPasswordResetToken', function(token){
    return this.passwordResetUrl(this.password) === token;
});
schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

schema.method('logAttemptedLogin', function(){
    return this.attemptedLogin++;
});

schema.method('validAttemptedLogin', function(){
    if(this.attemptedLogin <=5){
        return true;
    }
    else return false;
});

schema.method('resetAttemptedLogin', function(){
    return this.attemptedLogin = 0;
})

schema.method.setAdmin = function(isAdmin) {
    this.isAdmin = isAdmin;
};

schema.method.finishCurrentOrder = function(newOrderStatus) {
    var user = this;
    return Order.findById(user.cart).exec()
    .then(function(cart) {
        cart.orderStatus = newOrderStatus;
        cart.date.finished = Date.now();
        return cart.save();
    })
    .then(function() {
        user.pastOrderList.push(user.cart);
        return Order.create();
    })
    .then(function(newCart) {
        user.cart = newCart._id;
    });
};

schema.plugin(deepPopulate);

mongoose.model('User', schema);
