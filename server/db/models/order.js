'use strict';
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

var schema = new mongoose.Schema({
  songs: [{
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    },
    price: {
      type: Number
    },
    quantity: Number
  }],
  albums: [{
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album'
    },
    price: {
      type: Number
    },
    quantity: Number
  }],
  date: {
    created: {
      type: Date,
      default: Date.now
    },
    // finished = cancelled OR completed
    finished: {
      type: Date
    }
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  orderStatus: {
    // created, processing, cancelled, or completed
    type: String,
    enum: ['created', 'processing', 'cancelled', 'completed'],
    default: 'created',
    required: true
  }
});

schema.pre('save', function(next) {
  if (this.isModified('orderStatus')) {
    // update dates if order is finished
    var status = this.orderStatus;
    if (status === 'cancelled' || status === 'completed') {
      // set cancel date
      this.date.finished = Date.now();
    }
  }

  var subTotal = this.songs.reduce(function(sum, song) {
    return sum + song.price
  }, 0)

  this.totalPrice = this.albums.reduce(function(sum, album) {
    return sum + album.price
  }, subTotal)

  next();
});

schema.plugin(deepPopulate);

mongoose.model('Order', schema);