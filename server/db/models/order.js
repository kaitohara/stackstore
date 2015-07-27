'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
<<<<<<< HEAD
	items: [{
        	// stores cached price and reference to song
            id: String,
            // true if album, false if song
            itemType: {type: String, enum: ['album', 'song']},
            price: Number,
            quantity: Number
    }],
	date: {
		created: {type: Date, default: Date.now},
		// finished = cancelled OR completed
		finished: Date
	},
	totalPrice: {
		type: Number
	},
	orderStatus: {
		// created, processing, cancelled, or completed
       type: String, enum: ['created', 'processing', 'cancelled', 'completed']
	}
=======
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
>>>>>>> c64892f60a67bd8a43032722307b625e1bd78355
});

mongoose.model('Order', schema);
