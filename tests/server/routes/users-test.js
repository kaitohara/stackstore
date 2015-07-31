// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var agent = supertest.agent(app);

var Album = mongoose.model('Album');
var Song = mongoose.model('Song');
var User = mongoose.model('User');
var Genre = mongoose.model('Genre');
var Artist = mongoose.model('Artist');
var Order = mongoose.model('Order');

describe('Users Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	// make dummy data
	var user, song, song2, album, album2, genre, artist, order, order2, order3;
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
		console.log('genre');
		Genre.create({
			name: 'testGenre'
		}, function(err, g) {
			if (err) return done(err);
			genre = g;
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
			reviews: [],
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
			price: 55,
			downloads: 100,
			// cap defaults to 1000
			// null album (not checking that here)
			reviews: [],
			url: 'this is a url'
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
			reviews: []
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
			reviews: []
		}, function(err, a) {
			if (err) return done(err);
			album2 = a;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('order');
		Order.create({
			songs: [song],
			albums: [album],
			// date defaults
			totalPrice: song.price + album.price,
			orderStatus: 'created'
		}, function(err, o) {
			if (err) return done(err);
			order = o;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('order2');
		Order.create({
			songs: [song2],
			albums: [album2],
			// date defaults
			totalPrice: song2.price + album2.price,
			orderStatus: 'processing'
		}, function(err, o) {
			if (err) return done(err);
			order2 = o;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('order3');
		Order.create({
			songs: [song],
			albums: [album2],
			// date defaults
			totalPrice: song.price + album2.price,
			orderStatus: 'completed'
		}, function(err, o) {
			if (err) return done(err);
			order3 = o;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('user');
		User.create({
			email: 'testing@testing.gov',
			password: 'password',
			isAdmin: false,
			pastOrderList: [order2, order3],
			cart: order
		}, function(err, u) {
			if (err) return done(err);
			user = u;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('user2');
		User.create({
			email: 'testing2@testing.edu',
			password: 'password2',
			isAdmin: true
			// this user has no orders
		}, function(err, u) {
			if (err) return done(err);
			user2 = u;
			done();
		});
	});


	it('returns all users', function(done) {
		agent.get('/api/users')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body.length).to.equal(2);
				expect(res.body[0].email).to.equal('testing@testing.gov');
				expect(res.body[0].cart).to.not.be.null;
				expect(res.body[0].pastOrderList).to.be.instanceof(Array);
				expect(res.body[0].pastOrderList.length).to.equal(2);
				done();
			});
	});

	it('creates a new user', function(done) {
		agent.post('/api/users')
			.send({
				email: 'new@testing.co',
				password: 'ahhh'
			})
			.expect(201)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.email).to.equal('new@testing.co');
				done();
			});
	});

	it('returns one user', function(done) {
		agent.get('/api/users/' + user2._id)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.email).to.equal('testing2@testing.edu');
				done();
			});
	});

	it('GET one that doesn\'t exist', function (done) {
		agent
			.get('/api/users/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('updates a user', function(done) {
		agent.put('/api/users/' + user._id)
			.expect(200)
			.send({
				email: 'updated@user'
			})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.email).to.equal('updated@user');
				User.findById(user._id).exec()
					.then(function(u) {
						expect(u.email).to.equal('updated@user');
						done();
					});
			});
	});

	it('PUT one that doesn\'t exist', function (done) {
		agent
			.put('/api/users/123abcnotamongoid')
			.send({email: 'email@updated.com'})
			.expect(404)
			.end(done);
	});

	it('deletes a user', function(done) {
		agent.delete('/api/users/' + user._id)
			.expect(204)
			.end(function(err, res) {
				if (err) return done(err);
				User.findById(user._id, function(err, al) {
					expect(al).to.be.null;
					done();
				});
			});
	});

	it('DELETE one that doesn\'t exist', function (done) {
		agent
			.delete('/api/users/123abcnotamongoid')
			.expect(404)
			.end(done);
	});
});
