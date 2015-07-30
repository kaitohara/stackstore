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

var Artist = mongoose.model('Artist');

describe('Artists Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	// make dummy data
	var artist, artist2;
	beforeEach(function(done) {
		console.log('artist');
		Artist.create({
			name: 'test artist'
		}, function(err, a) {
			if (err) return done(err);
			artist = a;
			done();
		});
	});
	beforeEach(function(done) {
		console.log('artist2');
		Artist.create({
			name: 'test artist2'
		}, function(err, a) {
			if (err) return done(err);
			artist2 = a;
			done();
		});
	});

	it('returns all artists', function(done) {
		agent.get('/api/artists')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body.length).to.equal(2);
				expect(res.body[0].name).to.equal('test artist');
				done();
			});
	});

	it('creates a new artist', function(done) {
		agent.post('/api/artists')
			.send({
				name: 'new artist',
			})
			.expect(201)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.name).to.equal('new artist');
				done();
			});
	});

	it('returns one artist', function(done) {
		agent.get('/api/artists/' + artist._id)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body.name).to.equal('test artist');
				done();
			});
	});

	it('GET one that doesn\'t exist', function (done) {
		agent
			.get('/api/artists/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('updates an artist', function(done) {
		agent.put('/api/artists/' + artist._id)
			.expect(200)
			.send({
				name: 'updated artist'
			})
			.end(function(err, res) {
				if (err) return done(err);
				console.log('res', res.body);
				expect(res.body.name).to.equal('updated artist');
				done();
			});
	});

	it('PUT one that doesn\'t exist', function (done) {
		agent
			.put('/api/artists/123abcnotamongoid')
			.send({name: 'Attempt To Update Name'})
			.expect(404)
			.end(done);
	});

	it('deletes an artist', function(done) {
		agent.delete('/api/artists/' + artist._id)
			.expect(204)
			.end(function(err, res) {
				if (err) return done(err);
				Artist.findById(artist._id, function(err, al) {
					expect(al).to.be.null;
					done();
				});
			});
	});

	it('DELETE one that doesn\'t exist', function (done) {
		agent
			.delete('/api/artists/123abcnotamongoid')
			.expect(404)
			.end(done);
	});

	it('GET with query string filter', function (done) {
		agent
		// in query strings %20 means a single whitespace character
			.get('/api/artists?name=test%20artist')
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(1);
				expect(res.body[0].name).to.equal('test artist');
				done();
			});
	});
});
