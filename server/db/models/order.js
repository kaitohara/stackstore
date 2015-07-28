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

mongoose.model('Order', schema);
