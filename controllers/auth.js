'use strict'

var passport = require('passport')
var hash = require('password-hash')
var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy
var TwitterStrategy = require('passport-twitter').Strategy
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var GoogleStrategy = require('passport-google-oauth').Strategy
var GithubStrategy = require('passport-github2').Strategy
var RegisterStrategy = require('passport-local-register').Strategy

/* require model database */
var User = require('../models/model.user.js')

module.exports = function (passport) {
  /* setup passport */
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  /* local */
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  }, function signup (req, username, password, done) {
    User.findOne({username: username}, function (err, user) {
      if (err) {return done(err)}
      else if (user) {return done(null, false)}else {
        var newUser = new User()
        newUser.username = username
        newUser.password = hash.generate(password)
        newUser.save(function (err) {
          if (err) {throw err}
          return done(null, newUser)
        })
      }
    })
  })
  )

  passport.use(new RegisterStrategy(
    function verify (username, password, done) {
      User.findOne({
        'username': username
      }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done() // see section below
        }
        if (!user.verifyPassword(password)) {
          return done(null, false)
        }
        done(null, user)
      })
    }, function create (username, password, done) {
      var newUser = new User()
      newUser.username = username
      newUser.password = hash.generate(password)
      newUser.save(function (err) {
        if (err) {throw err}
        return done(null, newUser)
      })
    }
  ))

  /* facebook */
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
  }, function (accessToken, refreshToken, profile, done) {
    User.findOne({'facebook.id': profile.id}, function (err, user) {
      if (err) return done(err)
      if (user) {return done(null, user)
      } else {
        var newUser = new User()
        newUser.facebook.id = profile.id
        newUser.facebook.token = accessToken
        newUser.facebook.displayName = profile.displayName
        // newUser.facebook.email = profile.email[0].value
        newUser.save(function (err) {
          if (err) throw err
          return done(null, newUser)
        })
      }
    })
  }
  ))

  /* twitter */
  let tweetAccessToken = process.env.TWEET_ACCESS_TOKEN
  let tweetTokenSecret = process.env.TWEET_ACCESS_TOKEN_SECRET
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWEET_CUSTOMER_KEY,
    consumerSecret: process.env.TWEET_CUSTOMER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  }, function (tweetAccessToken, tweetTokenSecret, profile, done) {
    User.findOne({'twitter.id': profile.id}, function (err, user) {
      if (err) return done(err)
      if (user) {return done(null, user)
      } else {
        var newUser = new User()
        newUser.twitter.id = profile.id
        newUser.twitter.token = accessToken
        newUser.twitter.username = profile.username
        newUser.twitter.displayName = profile.displayName
        newUser.save(function (err) {
          if (err) throw err
          return done(null, newUser)
        })
      }
    })
  }))

  /* google */
  // passport.use(new GoogleStrategy({
  //   clientID: process.env.google_client_id,
  //   clientSecret: process.env.google_client_secret,
  //   callbackURL: process.env.google_redirect_uris
  // // redirect_uri: process.env.google_redirect_uri
  // }, function (accessToken, refreshToken, profile, done) {
  //   User.findOne({'google.id': profile.id}, function (err, user) {
  //     if (err) return done(err)
  //     if (user) {return done(null, user)
  //     } else {
  //       var newUser = new User()
  //       newUser.google.id = profile.id
  //       newUser.google.token = accessToken
  //       newUser.google.displayName = profile.displayName
  //       newUser.google.email = profile.emails[0].value
  //       newUser.save(function (err) {
  //         if (err) throw err
  //         return done(null, newUser)
  //       })
  //     }
  //   })
  // }
  // ))

  /* github */
  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  }, function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOne({'github.id': profile.id}, function (err, user) {
      if (err) return done(err)

      if (user) {
        return done(null, user)
      } else {
        var newUser = new User()
        newUser.github.id = profile.id
        newUser.github.token = accessToken
        newUser.github.displayName = profile.displayName
        newUser.github.username = profile.username
        // newUser.github.email = profile.emails[0].value
        newUser.save(function (err) {
          if (err) throw err
          return done(null, newUser)
        })
      }
    })
  })
  )
}
