let LocalStrategy = require('passport-local').Strategy
let TwitterStrategy = require('passport-twitter').Strategy
let FacebookStrategy = require('passport-facebook').Strategy
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
let GithubStrategy = require('passport-github2').Strategy
let configAuth = require('./auth.js')
let User = require('../models/users')

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // TWITTER ================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({
      consumerKey: configAuth.twitterAuth.consumerKey,
      consumerSecret: configAuth.twitterAuth.consumerSecret,
      callbackURL: configAuth.twitterAuth.callbackURL
    },
      function (token, tokenSecret, profile, done) {
        process.nextTick(function () {
          User.findOne({ 'twitter.id': profile.id }, function (err, user) {
            if (err) return done(err)
            if (user) { return done(null, user) } else {
              var newUser = new User()
              newUser.twitter.id = profile.id
              newUser.twitter.token = token
              newUser.twitter.username = profile.username
              newUser.twitter.displayName = profile.displayName

              newUser.save(function (err) {
                if (err) throw err
                return done(null, newUser)
              })
            }
          })
        })
      }
    ))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================

    passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL
    },
      function (token, refreshToken, profile, done) {
        process.nextTick(function () {
          User.findOne({ 'facebook.id': profile.id }, function (err, user) {
            if (err) return done(err)
            if (user) { return done(null, user) } else {
              var newUser = new User()
              newUser.facebook.id = profile.id
              newUser.facebook.token = token
              // newUser.facebook.email = (profile.emails[0].value || '').toLowerCase()
              newUser.facebook.name = profile.displayName

              newUser.save(function (err) {
                if (err) throw err
                return done(null, newUser)
              })
            }
          })
        })
      }
    ))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================

    passport.use(new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL
    },
      function (token, refreshToken, profile, done) {
        process.nextTick(function () {
          User.findOne({ 'google.id': profile.id }, function (err, user) {
            if (err) return done(err)
            if (user) { return done(null, user) } else {
              var newUser = new User()
              newUser.google.id = profile.id
              newUser.google.token = token
              newUser.google.email = profile.emails[0].value
              newUser.google.name = profile.displayName

              newUser.save(function (err) {
                if (err) throw err
                return done(null, newUser)
              })
            }
          })
        })
      }
  ))

};
