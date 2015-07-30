// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var agent = supertest.agent(app);

var Genre = mongoose.model('Genre');

describe('Genres Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	// make dummy data
	var genre, genre2;
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
		console.log('genre2');
		Genre.create({
			name: 'testGenre2'
		}, function(err, g) {
			if (err) return done(err);
			genre2 = g;
			done();
		});
	});

	it('returns all genres', function(done) {
		agent.get('/api/genres')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body.length).to.equal(2);
				expect(res.body[0].name).to.equal('testGenre');
				done();
			});
	});

	it('returns one genre specified by name', function(done) {
		agent.get('/api/genres/' + 'testGenre2')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body.length).to.equal(1);
				expect(res.body[0].name).to.equal('testGenre2');
				done();
			});
	});
});
