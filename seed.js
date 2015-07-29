/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chance = new require('chance')(123);
var _ = require('lodash');
var async = require('async');
var connectToDb = require('./server/db');

// load in models
var User = mongoose.model('User');
var Artist = mongoose.model('Artist');
var Review = mongoose.model('Review');
var Genre = mongoose.model('Genre');
var Song = mongoose.model('Song');
var Album = mongoose.model('Album');
var Order = mongoose.model('Order');

// constants for generation
var numArtists = 20;
var numSongs = 100;
var numReviews = 150;
var numGenres = 5;
var numOrders = 16;
var songsPerAlbum = 5;
var reviewsPerAlbum = 3;
var ordersPerUser = 4;
var numAlbums = Math.ceil(numSongs / songsPerAlbum);


function randTitle() {
    return chance.sentence({
        words: chance.natural({
            min: 1,
            max: 6
        })
    }).slice(0, -1).replace(/\s\w/g, function(match) {
        return match.toUpperCase();
    });
}

function randArtist() {
    return {
        name: chance.first() + ' ' + chance.last()
    };
}

function randReview() {
    var user = chance.pick(users);
    return {
        title: randTitle(),
        content: chance.paragraph({
            sentences: chance.natural({
                min: 2,
                max: 4
            })
        }),
        author: user,
        rating: chance.integer({
            min: 1,
            max: 5
        })
    };
}

function randGenre() {
    return {
        name: chance.word()
    };
}

var songUrls = [
    'https://www.youtube.com/watch?v=vjW8wmF5VWc&list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI&index=1',
    'https://www.youtube.com/watch?v=QcIy9NiNbmo&list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI&index=2',
    'https://www.youtube.com/watch?v=yzTuBuRdAyA&list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI&index=3',
    'https://www.youtube.com/watch?v=QcIy9NiNbmo&list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI&index=4'
];

function randSong(n) {
    var review = reviews.slice(n * reviewsPerAlbum, (n + 1) * reviewsPerAlbum);
    var url = chance.pick(songUrls);
    return {
        title: randTitle(),
        price: chance.floating({
            fixed: 2,
            max: 1000,
            min: 0
        }),
        downloads: chance.d20(),
        cap: 2000,
        reviews: review,
        url: url
    };
}

function randAlbum(n) {
    var auth = chance.pick(artists);
    var genre = chance.pick(genres);
    var albumSongs = songs.slice(n * songsPerAlbum, (n + 1) * songsPerAlbum);
    var review = reviews.slice(n * reviewsPerAlbum, (n + 1) * reviewsPerAlbum);
    return {
        title: randTitle(),
        photo: "http://lorempixel.com/200/200",
        price: chance.floating({
            fixed: 2,
            max: 1000,
            min: 0
        }),
        year: chance.year(),
        artist: auth,
        downloads: chance.d20(),
        cap: 1000,
        genre: genre,
        songs: albumSongs,
        reviews: review
    };
}

function randOrder() {
    var totalPrice = 0;
    var songList = chance.pick(songs, 4);
    songList = songList.map(function(song) {
        totalPrice += song.price;
        return {
            song: song,
            price: song.price,
            quantity: chance.d6()
        };
    });
    var albumList = chance.pick(albums, 4);
    albumList = albumList.map(function(album) {
        totalPrice += album.price;
        return {
            album: album,
            price: album.price,
            quantity: chance.d6()
        };
    });
    var status = chance.pick(['created', 'processing', 'cancelled', 'completed']);
    var date = {};
    if (status === 'cancelled') {
        // finished an hour from now (if cancelled)
        date = {
            finished: Date.now() + 3600000
        };
    }
    return {
        songs: songList,
        albums: albumList,
        date: date,
        totalPrice: totalPrice,
        orderStatus: status
    };
}

console.log('---seeding---');

console.log('-generating users-');
// hardcode users so we know their passwords
// // add user carts later

var users = [{
    email: 'testing@fsa.com',
    password: 'password',
    name: "Test Em",
}, {
    email: 'obama@gmail.com',
    password: 'potus',
    name: "Obama",
    isAdmin: true
}, {
    email: 'jack@mulrow.com',
    password: 'jack',
    name: "Jack Mulrow",
    isAdmin: true
}, {
    email: 'kaito@hara.com',
    password: 'kaito',
    name: "Kaito Hara",
    isAdmin: true
}];
users = users
    .map(function(datum) {
        return new User(datum);
    });
console.log('-done generating users-');

console.log('-generating artists-');
var artists = _.times(numArtists, randArtist)
    .map(function(datum) {
        return new Artist(datum);
    });
console.log('-done generating artists-');

console.log('-generating reviews-');
var reviews = _.times(numReviews, randReview)
    .map(function(datum) {
        return new Review(datum);
    });
console.log('-done generating reviews-');

console.log('-generating genres-');
var genres = _.times(numGenres, randGenre)
    .map(function(datum) {
        return new Genre(datum);
    });
console.log('-done generating genres-');

console.log('-generating songs-');
var songs = _.times(numSongs, randSong)
    .map(function(datum) {
        return new Song(datum);
    });
console.log('-done generating songs-');

console.log('-generating albums-');
var albums = _.times(numAlbums, randAlbum)
    .map(function(datum) {
        return new Album(datum);
    });
console.log('-done generating albums-');

console.log('-generating orders-');
var orders = _.times(numOrders, randOrder)
    .map(function(datum) {
        return new Order(datum);
    });
console.log('-done generating orders-');

console.log('-assign orders to users-');
users.forEach(function(user, idx) {
    user.cart = orders[idx * ordersPerUser];
    user.pastOrderList = orders.slice(idx * ordersPerUser + 1, (idx + 1) * ordersPerUser);
});
console.log('-finished assigning orders-');

console.log('-assign albums to songs-');
songs.forEach(function(song, idx) {
    var alb = albums.filter(function(album) {
        return album.songs.indexOf(song._id) > -1;
    })[0];
    song.album = alb;
    song.artist = alb.artist;
});
console.log('-finished assigning albums-');


var all = users.concat(artists, reviews, genres, songs, albums, orders);
var models = [User, Artist, Review, Genre, Song, Album, Order];

console.log('-removing-');
async.each(models,
    function(model, done) {
        model.remove({}, done);
    },
    function(err) {
        if (err) return console.error('error while removing documents', err);
        console.log('-done removing-');
        console.log('-saving-');
        async.each(all,
            function(doc, done) {
                doc.save(done);
            },
            function(err) {
                if (err) console.error('seed error', err);
                else console.log('-done saving-');
                console.log('---done seeding---');
                process.exit();
            }
        );
    }
);