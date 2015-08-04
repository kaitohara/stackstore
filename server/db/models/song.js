'use strict';
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

var schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		default: "http://lorempixel.com/200/200/nightlife"
	},
	price: {
		type: Number,
		required: true,
		min: 0,
		default: 1.50
	},
	downloads: {
		type: Number,
		default: 0
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

schema.statics.getAllReviews = function(){
    schema.find({})
    	.deepPopulate(songs, 'review.author', function(err, _songs){
            songs.forEach(function(song){
                return song;
            });
        });
};

schema.plugin(deepPopulate);

mongoose.model('Song', schema);
