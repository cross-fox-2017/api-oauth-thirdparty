var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var routes = require('./routes/index')
require('dotenv').config()

var mongoose = require('mongoose')
var passport = require('passport')
var app = express()

var User = require('./models/user')

app.use(passport.initialize())
app.use(require('express-session')({
  secret: 'fatboy',
  resave: false,
saveUninitialized: false}
))
app.use(passport.session())

var FB = require('passport-facebook').Strategy

// terakhir sampai disini coy !!
var GOOGLE = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new FB({
  clientID: '259686037801976',
  clientSecret: '5d4f90fa14c12a590068c16bd06d43f4',
  callbackURL: 'http://localhost:3000/facebook/callback'

}, function (accessToken, refreshToken, profile, done) {
  User.findOne({ 'facebook.id': profile.id }, function (err, user) {
    if (err)
      return done(err)
    if (user)
      return done(null, user)
    else {
      console.log(profile.id)
      var FBuser = new User()
      FBuser.facebook.id = profile.id
      FBuser.facebook.token = accessToken
      FBuser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName

      FBuser.save(function (err) {
        if (err)
          throw err
        return done(null, FBuser)
      })
    }
  })
}
))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', routes)

mongoose.connect(`${process.env.MONGODB_URI}`, function (err) { // localhost:27017 untuk di db
  if (err) {
    console.log(err)
  } else {
    console.log(`connected to ${process.env.PORT} ${process.env.MONGODB_URI}`)
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
