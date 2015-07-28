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
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Genre = mongoose.model('Genre');
var Artist = mongoose.model('Artist');

describe('Reviews Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	// make dummy data
	var user, review, review2, song, album, album2, genre, artist;
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
		console.log('review2');
		Review.create({
			title: 'second test review',
			content: 'some more test content that still has to be at least 50 characters',
			author: user,
			rating: 5
		}, function(err, re) {
			if (err) return done(err);
			review2 = re;
			done();
		});
	});

	it('returns all reviews', function(done) {
		agent.get('/api/review')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body.length).to.equal(2);
				expect(res.body[0].title).to.equal('test review');
				expect(res.body[0].rating).to.equal(4);
				done();
			});
	});

	it('creates a new review', function(done) {
		agent.post('/api/review')
			.send({
				title: 'new review',
				content: 'new text that still needs to be 50 characters and this should be long enough',
				author: user._id,
				rating: 1
			})
			.expect(201)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal('new review');
				done();
			});
	});

	it('returns one review', function(done) {
		agent.get('/api/review/' + review._id)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal('test review');
				done();
			});
	});

	it('GET one that doesn\'t exist', function (done) {
		agent
			.get('/api/review/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('updates a review', function(done) {
		agent.put('/api/review/' + review._id)
			.expect(200)
			.send({
				title: 'updated review'
			})
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal('updated review');
				Review.findById(review._id).then(function(rev) {
					expect(rev.title).to.equal('updated review');
					done();
				});
			});
	});

	it('PUT one that doesn\'t exist', function (done) {
		agent
			.put('/api/review/123abcnotamongoid')
			.send({title: 'this won\'t work'})
			.expect(404)
			.end(done);
	});

	it('deletes a review', function(done) {
		agent.delete('/api/review/' + review2._id)
			.expect(204)
			.end(function(err, res) {
				if (err) return done(err);
				Review.findById(review2._id, function(err, or) {
					expect(or).to.be.null;
					done();
				});
			});
	});

	it('DELETE one that doesn\'t exist', function (done) {
		agent
			.delete('/api/review/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('GET with query string filter', function (done) {
		agent
		// in query strings %20 means a single whitespace character
			.get('/api/review?title=test%20review')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(1);
				expect(res.body[0].title).to.equal('test review');
				done();
			});
	});
});
