'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
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
	genre: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Genre'
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
	},
	// true if only available on a seller's store
	storeExclusive: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Song', schema);
