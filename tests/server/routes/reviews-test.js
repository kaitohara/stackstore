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

var Review = mongoose.model('Review');
var User = mongoose.model('User');

describe('Review Route', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    // make dummy data
    var user, review, review2, review3;
    beforeEach(function (done) {
        console.log('user');
        User.create({
            email: 'testing@testing.gov',
            password: 'password',
            isAdmin: false
        }, function (err, u) {
            if (err) return done(err);
            user = u;
            done();
        });
    });
    beforeEach(function (done) {
        console.log('review');
        Review.create({
            title: 'test review',
            content: 'some test content that has to be a minimum of 50 characters',
            author: user,
            rating: 4
        }, function (err, r) {
            if (err) return done(err);
            review = r;
            done();
        });
    });
    beforeEach(function (done) {
        console.log('review2');
        Review.create({
            title: 'second test review',
            content: 'some more test content that still has to be at least 50 characters',
            author: user,
            rating: 5
        }, function (err, re) {
            if (err) return done(err);
            review2 = re;
            done();
        });
    });

    beforeEach(function (done) {
        console.log('review3');
        Review.create({
            title: '3rd test review',
            content: 'lorem ipsum that has to be a least 50 plus characters for validation',
            author: user,
            rating: 2
        }, function (err, re) {
            if (err) return done(err);
            review3 = re;
            done();
        });
    });

    it('returns all reviews', function (done) {
        agent.get('/api/reviews')
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);

                expect(res.body).to.be.instanceof(Array);
                expect(res.body.length).to.equal(3);
                expect(res.body[0].title).to.equal('test review');
                expect(res.body[0].rating).to.equal(4);
                done();
            });
    });

    it('returns one review', function(done) {
            agent.get('/api/reviews/' + review._id)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.title).to.equal('test review');
                    done();
                });
        });

    it('creates a new review', function(done) {
        agent.post('/api/reviews')
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

    it('updates a review', function(done) {
        agent
            .put('/api/reviews/' + review._id)
            .send({title: 'updated review'})
            .expect(200)
            .end(function(err, res) {
                if (err){
                    done(err);
                }
                else {
                    expect(res.body.title).to.equal('updated review');
                    Review
                        .findById(res.body._id)
                        .then(function (rev) {
                            expect(rev.title).to.equal('updated review');
                            done();
                        })
                        .then(null, function (err) {
                            done(err);
                        });
                }
            });
    });

    it('deletes a review', function(done) {
        agent.delete('/api/reviews/' + review._id)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                else
                Review.findById(review._id, function(err, or) {
                    expect(or).to.be.null;
                    done();
                });
            });
    });


    it('GET one that doesn\'t exist', function (done) {
        agent
            .get('/api/reviews/123abcnotamongoid')
            .expect(404)
            .end(done);
    });


    it('DELETE one that doesn\'t exist', function (done) {
        agent
            .delete('/api/reviews/123abcnotamongoid')
            .expect(404)
            .end(done);
    });


    it('PUT one that doesn\'t exist', function (done) {
        agent
            .put('/api/reviews/123abcnotamongoid')
            .send({title: 'this won\'t work'})
            .expect(404)
            .end(done);
    });


    it('returns multiple reviews specified by ids', function (done) {
        var queryString = review._id + ',' + review2._id + ',' + review3._id;
        agent.get('/api/reviews/multiple')
            .query({ids: queryString})
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.length).to.equal(3);
                expect(res.body).to.be.instanceof(Array);
                expect(res).to.have.deep.property('body[0].title', 'test review');
                expect(res).to.have.deep.property('body[1].title', 'second test review');
                expect(res).to.have.deep.property('body[2].title', '3rd test review');
                done();
            });
    });


    it('GET many that don\'t exist', function (done) {
        agent
            .get('/api/reviews/multiple')
            .query({ids: '123abcnotamongoid,' + '2C12312324134315325sdfsdfdsfds'})
            .expect(404)
            .end(done);
    });


    it('return with query string filter', function (done) {
        agent
            // in query strings %20 means a single whitespace character
            .get('/api/reviews?title=test%20review')
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
