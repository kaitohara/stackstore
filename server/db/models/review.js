'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true,
		minlength: 50,
	},
	author: {
		type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		required: true
	},
	rating: {
		type: Number,
		min: 1,
		max: 5
	}
});

mongoose.model('Review', schema);