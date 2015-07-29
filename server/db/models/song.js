'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true,
		min: 0 
	},
	downloads: {
		type: Number
	},
	cap: {
		type: Number,
		default: 1000
	},
	artist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Artist'
	},
	album: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Album'
	},
	reviews: {
		type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
	},
	url: {
		type: String
	}
});

mongoose.model('Song', schema);