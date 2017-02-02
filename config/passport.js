'use strict'

var passport = require('passport')
var hash = require('password-hash')
var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GithubStrategy = require('passport-github2').Strategy;

var User = require('../models/user.js')

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true
    }, function signup (req, username, password, done){
      User.findOne({username: username}, function(err, user){
        if (err) {return done(err)}
        else if (user) {return done(null, false)}
        else {
          var newUser = new User()
          newUser.username = username;
          newUser.password = password;
          newUser.username = hash.generate(username);
          newUser.save(function(err){
            if(err) {throw err};
            return done(null, newUser)
          });
        };
      });
    })
  )

  passport.use(new FacebookStrategy({
    clientID        : process.env.facebook_clientID,
    clientSecret    : process.env.facebook_clientSecret,
    callbackURL     : process.env.facebook_callbackURL
  }, function(accessToken, refreshToken, profile, done){
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if (err) return done(err);
        if (user){return done(null, user)
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = accessToken;
          newUser.facebook.displayName = profile.displayName;
          // newUser.facebook.email = profile.email[0].value;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser)
          })
        }
      })
    }
  ))

  passport.use(new TwitterStrategy({
    consumerKey     : process.env.twitter_consumerKey,
    consumerSecret  : process.env.twitter_consumerSecret,
    callbackURL     : process.env.twitter_callbackURL
  }, function(accessToken, tokenSecret, profile, done){
    User.findOne({'twitter.id': profile.id}, function(err, user) {
      if (err) return done(err);
      if (user){return done(null, user)
      } else {
        var newUser = new User();
        newUser.twitter.id = profile.id;
        newUser.twitter.token = accessToken;
        newUser.twitter.username = profile.username;
        newUser.twitter.displayName = profile.displayName;
        newUser.save(function(err){
          if(err) throw err;
          return done(null, newUser)
        })
      }
    })
  }))

  passport.use(new GoogleStrategy({
    clientID: process.env.google_clientID,
    clientSecret: process.env.google_clientSecret,
    callbackURL: process.env.google_callbackURL
    // redirect_uri: process.env.google_redirect_uri
  }, function(accessToken, refreshToken, profile, done){
      User.findOne({'google.id': profile.id}, function(err, user) {
        if (err) return done(err);
        if (user){return done(null, user)
        } else {
          var newUser = new User();
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.displayName = profile.displayName;
          newUser.google.email = profile.emails[0].value;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser)
          })
        }
      })
    }
  ))

  passport.use(new GithubStrategy({
    clientID: process.env.github_clientID,
    clientSecret: process.env.github_clientSecret,
    callbackURL: process.env.github_callbackURL
  }, function(accessToken, refreshToken, profile, done){
    console.log(profile);
      User.findOne({'github.id': profile.id}, function(err, user) {
        if (err) return done(err);
        if (user){return done(null, user)
        } else {
          var newUser = new User();
          newUser.github.id = profile.id;
          newUser.github.token = accessToken;
          newUser.github.displayName = profile.displayName;
          newUser.github.username = profile.username;
          // newUser.github.email = profile.emails[0].value;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser)
          })
        }
      })
    })
  )
}
