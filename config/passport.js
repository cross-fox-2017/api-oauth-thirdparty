'use strict'

var passport = require('passport')
var hash = require('password-hash')
var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

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
  }, function(token, refreshToken, profile, done){
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if (err) return done(err);
        if (user){return done(null, user)
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.displayName;
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

  }))
}
