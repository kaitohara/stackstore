// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var agent = supertest.agent(app);

var Album = mongoose.model('Album');
var Song = mongoose.model('Song');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Genre = mongoose.model('Genre');
var Artist = mongoose.model('Artist');


describe('Songs Route', function () {

	beforeEach('Establish DB connection', function (done) {
		console.log('connecting', !!mongoose.connection.db);
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		console.log('clearing');
		clearDB(done);
	});

	// make dummy data
	var user, review, song, song2, album, genre, artist;
	beforeEach(function(done) {
		console.log('user');
		User.create({
			email: 'testing@testing.gov',
			password: 'password',
			isAdmin: false
		}, function(err, u) {
			if (err) return done(err);
			user = u;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('review');
		Review.create({
			title: 'test review',
			content: 'some test content that has to be a minimum of 50 characters',
			author: user,
			rating: 4
		}, function(err, r) {
			if (err) return done(err);
			review = r;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('genre');
		Genre.create({
			name: 'test genre'
		}, function(err, g) {
			if (err) return done(err);
			genre = g;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('artist');
		Artist.create({
			name: 'test artist'
		}, function(err, ar) {
			if (err) return done(err);
			artist = ar;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('song');
		Song.create({
			title: 'test song',
			price: 55,
			downloads: 100,
			// cap defaults to 1000
			// null album (not checking that here)
			reviews: [review],
			url: 'this is a url'
		}, function(err, s) {
			if (err) return done(err);
			song = s;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('song2');
		Song.create({
			title: 'test song2',
			price: 200,
			downloads: 150,
			// cap defaults to 1000
			// null album (not checking that here)
			reviews: [review],
			url: 'this is a url2'
		}, function(err, s) {
			if (err) return done(err);
			song2 = s;
			done();
		});
	});
	beforeEach(function(done) {
		Album.create({
			title: 'test album',
			// photo has a default
			price: 1337,
			year: 2015,
			artist: artist,
			downloads: 25,
			// cap defaults to 1000
			genre: genre,
			songs: [song],
			reviews: [review]
		}, function(err, a) {
			if (err) return done(err);
			album = a;
			done();
		});
	});
	beforeEach(function(done) {
		Song.findByIdAndUpdate(song._id, {album: album._id}, function() {
			done();
		});
	});
	beforeEach(function(done) {
		Song.findByIdAndUpdate(song2._id, {album: album._id}, function() {
			done();
		});
	});


	it('returns all songs', function(done) {
		agent.get('/api/songs')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body.length).to.equal(2);
				expect(res.body[0].title).to.equal('test song');
				done();
			});
	});

	it('creates a new song', function(done) {
		agent.post('/api/songs')
			.send({
				title: 'made this song',
				// photo has a default
				price: 2,
				year: 2000,
				artist: artist._id,
				downloads: 50,
				// cap defaults to 1000
				genre: genre._id,
				songs: [song._id],
				reviews: [review._id]
			})
			.expect(201)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal('made this song');
				done();
			});
	});

	it('returns one song', function(done) {
		agent.get('/api/songs/' + song._id)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal('test song');
				done();
			});
	});

	it('GET one that doesn\'t exist', function (done) {
		agent
			.get('/api/songs/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('updates an song', function(done) {
		agent.put('/api/songs/' + song._id)
			.expect(200)
			.send({
				title: 'this is a new title'
			})
			.end(function(err, res) {
				if (err) return done(err);
				console.log('res', res.body);
				expect(res.body.title).to.equal('this is a new title');
				done();
			});
	});

	it('PUT one that doesn\'t exist', function (done) {
		agent
			.put('/api/songs/123abcnotamongoid')
			.send({title: 'Attempt To Update Book Title'})
			.expect(404)
			.end(done);
	});

	it('deletes an song', function(done) {
		agent.delete('/api/songs/' + song._id)
			.expect(204)
			.end(function(err, res) {
				if (err) return done(err);
				Song.findById(song._id, function(err, al) {
					expect(al).to.be.null;
					done();
				});
			});
	});

	it('DELETE one that doesn\'t exist', function (done) {
		agent
			.delete('/api/songs/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('GET with query string filter', function (done) {
		agent
		// in query strings %20 means a single whitespace character
			.get('/api/songs?title=test%20song')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(1);
				expect(res.body[0].title).to.equal('test song');
				done();
			});
	});
});
