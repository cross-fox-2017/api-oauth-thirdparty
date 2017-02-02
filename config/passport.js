'use strict'

var passport = require('passport')
var hash = require('password-hash')
var LocalStrategy = require('passport-local').Strategy

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
      usernameField: 'username',
      passwordField: 'password',
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
}
