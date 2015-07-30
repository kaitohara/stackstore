'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	photo: {
		// stored as url
		type: String,
		default: "http://lorempixel.com/200/200/nightlife"
	},
	price: {
		type: Number,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	artist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Artist',
		required: true
	},
	downloads: {
		type: Number
	},
	cap: {
		type: Number,
		default: 1000
	},
	genre: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Genre'
		}],
		required: true
	},
	songs: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Song'
		}],
		required: true
	},
	reviews: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}]
	}
});

mongoose.model('Album', schema);