'use strict';
var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate');

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
	}
});

schema.statics.getAllReviews = function(){
    schema
        .find({})
        .deepPopulate(songs, 'review.author', function(err, _songs){
            songs.forEach(function(song){
                return song;
            })
        });

}

mongoose.model('Song', schema);
