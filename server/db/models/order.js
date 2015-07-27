'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  items: [{
    // stores cached price and reference to song
    id: String,
    // true if album, false if song
    itemType: {
      type: String,
      enum: ['album', 'song']
    },
    price: Number,
    quantity: Number
  }],
  date: {
    created: {
      type: Date,
      default: Date.now
    },
    // finished = cancelled OR completed
    finished: Date
  },
  totalPrice: {
    type: Number
  },
  orderStatus: {
    // created, processing, cancelled, or completed
    type: String,
    enum: ['created', 'processing', 'cancelled', 'completed'],
    default: 'created'
  }
});

mongoose.model('Order', schema);