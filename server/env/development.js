var keys = require('../../keys');

module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/stack-store",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
    "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
    "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE"
  },
  "FACEBOOK": {
    "clientID": keys.oauth.facebook.clientID,
    "clientSecret": keys.oauth.facebook.clientSecret,
    "callbackURL": keys.oauth.facebook.callbackURL
  },
  "GOOGLE": {
    "clientID": keys.oauth.google.clientID,
    "clientSecret": keys.oauth.google.clientSecret,
    "callbackURL": keys.oauth.google.callbackURL
  }
};