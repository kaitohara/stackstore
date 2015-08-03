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
var Store = mongoose.model('Store');

describe('Stores Route', function () {

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
	var user, user2, review1, review2, song, album, album2, genre, artist, store;
	beforeEach(function(done) {
		console.log('user');
		User.create({
			email: 'testing@testing.gov',
			password: 'password',
			isAdmin: false,
			isSeller: true
		}, function(err, u) {
			if (err) return done(err);
			user = u;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('user');
		User.create({
			email: 'other@testing.gov',
			password: 'password',
			isAdmin: false,
			isSeller: true
		}, function(err, u) {
			if (err) return done(err);
			user2 = u;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('review1');
		Review.create({
			title: 'test review',
			content: 'some test content that has to be a minimum of 50 characters',
			author: user,
			rating: 4
		}, function(err, r) {
			if (err) return done(err);
			review1 = r;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('review2');
		Review.create({
			title: 'second test review',
			content: 'some more test content that still has to be at least 50 characters',
			author: user,
			rating: 4
		}, function(err, re) {
			if (err) return done(err);
			review2 = re;
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
			reviews: [review2],
			url: 'this is a url',
			storeExclusive: true
		}, function(err, s) {
			if (err) return done(err);
			song = s;
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
			reviews: [review1],
			storeExclusive: true
		}, function(err, a) {
			if (err) return done(err);
			album = a;
			done();
		});
	});
	beforeEach(function(done) {
		Album.create({
			title: 'test album2',
			// photo has a default
			price: 5000,
			year: 2005,
			artist: artist,
			downloads: 20,
			// cap defaults to 1000
			genre: genre,
			songs: [song],
			reviews: [review2],
			storeExclusive: true
		}, function(err, a) {
			if (err) return done(err);
			album2 = a;
			done();
		});
	});
	beforeEach(function(done) {
		Store.create({
			name: 'test store',
			songs: [song],
			albums: [album, album2],
			date: {},
			owner: user,
		}, function(err, st) {
			if (err) return done(err);
			store = st;
			done();
		});
	});

	it('returns all stores', function(done) {
		agent.get('/api/stores')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body.length).to.equal(1);
				expect(res.body[0].name).to.equal('test store');
				done();
			});
	});

	it('creates a new store', function(done) {
		agent.post('/api/stores')
			.send({
				name: 'made this store',
				songs: [song._id],
				albums: [album._id, album2._id],
				date: {},
				owner: user2,
			})
			.expect(201)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.name).to.equal('made this store');
				Store.findOne({name: 'made this store'}).exec()
					.then(function(store) {
						expect(store.name).to.equal('made this store');
						done();
					});
			});
	});

	it('returns one store', function(done) {
		agent.get('/api/stores/' + store._id)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.name).to.equal('test store');
				done();
			});
	});

	it('GET one that doesn\'t exist', function (done) {
		agent
			.get('/api/stores/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('updates an store', function(done) {
		agent.put('/api/stores/' + store._id)
			.expect(200)
			.send({
				name: 'this is a new title'
			})
			.end(function(err, res) {
				if (err) return done(err);
				console.log('res', res.body);
				expect(res.body.name).to.equal('this is a new title');
				Store.findById(store._id).exec()
					.then(function(al) {
						expect(al.name).to.equal('this is a new title');
						done();
					});
			});
	});

	it('PUT one that doesn\'t exist', function (done) {
		agent
			.put('/api/stores/123abcnotamongoid')
			.send({name: 'Attempt To Update Book Title'})
			.expect(404)
			.end(done);
	});

	it('deletes a store', function(done) {
		agent.delete('/api/stores/' + store._id)
			.expect(204)
			.end(function(err, res) {
				if (err) return done(err);
				Store.findById(store._id, function(err, al) {
					expect(al).to.be.null;
					done();
				});
			});
	});

	it('DELETE one that doesn\'t exist', function (done) {
		agent
			.delete('/api/stores/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('GET with query string filter', function (done) {
		agent
		// in query strings %20 means a single whitespace character
			.get('/api/stores?name=test%20store')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(1);
				expect(res.body[0].name).to.equal('test store');
				done();
			});
	});
});
