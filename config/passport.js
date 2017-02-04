const TwitterStrategy = require('passport-twitter').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const config = require('../oauth')
const User = require('../models/users')

module.exports = (passport) => {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user)
    })
  })

  passport.use(new TwitterStrategy({
      consumerKey: config.twitterAuth.consumerKey,
      consumerSecret: config.twitterAuth.consumerSecret,
      callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function() {
        Users.findOne({
          'twitter.id': profile.id
        }, function(err, user) {
          if (err) return done(err)
          if (user) {
            return done(null, user)
          } else {
            let newUser = new User()
            newUser.twitter.id = profile.id
            newUser.twitter.token = token
            newUser.twitter.username = profile.username
            newUser.twitter.displayName = profile.displayName

            newUser.save(function(err) {
              if (err) throw err
              return done(null, newUser)
            })
          }
        })
      })
    }
  ))

  passport.use(new FacebookStrategy({
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        Users.findOne({
          'facebook.id': profile.id
        }, function(err, user) {
          if (err) return done(err)
          if (user) {
            return done(null, user)
          } else {
            let newUser = new User()
            newUser.facebook.id = profile.id
            newUser.facebook.token = token
            newUser.facebook.email = profile.emails[0].value
            newUser.facebook.name = profile.displayName

            newUser.save(function(err) {
              if (err) throw err
              return done(null, newUser)
            })
          }
        })
      })
    }
  ))

  passport.use(new GoogleStrategy({
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        Users.findOne({
          'google.id': profile.id
        }, function(err, user) {
          if (err) return done(err)
          if (user) {
            return done(null, user)
          } else {
            var newUser = new User()
            newUser.google.id = profile.id
            newUser.google.token = token
            newUser.google.email = profile.emails[0].value
            newUser.google.name = profile.displayName

            newUser.save(function(err) {
              if (err) throw err
              return done(null, newUser)
            })
          }
        })
      })
    }
  ))
}
