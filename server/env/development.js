 var keys = require('../../keys');

 module.exports = {
   "DATABASE_URI": "mongodb://localhost:27017/stack-store",
   "SESSION_SECRET": "Optimus Prime is my real dad",
   "TWITTER": {
     "consumerKey": keys.oauth.twitter.consumerKey,
     "consumerSecret": keys.oauth.twitter.consumerSecret,
     "callbackUrl": keys.oauth.twitter.callbackURL
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

