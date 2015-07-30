'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
 	songs: [{
 		song: {type: mongoose.Schema.Types.ObjectId, ref: 'Song'},
 		price: {
 			type: Number
 		},
 		quantity: Number
 	}],
 	albums: [{
 		album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
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
		finished: Date
	},
	totalPrice: {
		type: Number
	},
	orderStatus: {
		// created, processing, cancelled, or completed
       type: String, 
       enum: ['created', 'processing', 'cancelled', 'completed'],
       required: true
	}
});

schema.pre('save', function(next) {
    if (this.isModified('orderStatus')) {
    	// update dates
    	var status = this.orderStatus;
    	if (status === 'cancelled' || status === 'completed') {
    		// set cancel date
    		this.date.finished = Date.now();
    	} else if (status === 'created') {
    		// set creation date
    		this.date.created = Date.now();
    	}
    }
    next();
});

mongoose.model('Order', schema);
