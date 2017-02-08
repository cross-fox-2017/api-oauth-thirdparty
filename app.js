var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/oauth');
mongoose.Promise = global.Promise;
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/user');
const config = require('./config');

var index = require('./routes/index');

var app = express();

app.use(require('express-session')({secret: config.localAuth.secret, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user,done){
  done(null,user.id)
})
passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user)
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

passport.use(new FacebookStrategy({
  clientID    : config.facebookAuth.clientID,
  clientSecret: config.facebookAuth.clientSecret,
  callbackURL : 'http://localhost:3000/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    User.findOne({'facebook.id':profile.id}, function(err,user) {
      if (err) return done (err);
      if (user) return done (null, user);
      else {
        var newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.name = profile.displayName;
        newUser.save(function(err) {
          if(err) throw err;
          return done(null, newUser);
          console.log(profile);
        })
      }
    })
  })
}))

passport.use(new TwitterStrategy({
  consumerKey    : config.twitterAuth.consumerKey,
  consumerSecret : config.twitterAuth.consumerSecret,
  callbackURL    : 'http://localhost:3000/auth/twitter/callback'
},
function(token, tokenSecret, profile, done) {
  process.nextTick(function() {
    User.findOne({'twitter.id':profile.id}, function(err,user) {
      if (err) return done (err);
      if (user) return done (null, user);
      else {
        var newUser = new User();
        newUser.twitter.id = profile.id;
        newUser.twitter.token = token;
        newUser.twitter.name = profile.username;
        newUser.save(function(err) {
          if(err) throw err;
          return done(null, newUser);
          console.log(profile);
        })
      }
    })
  })
}))

passport.use(new GoogleStrategy({
  clientID    : config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL : 'http://localhost:3000/auth/google/callback'
},
function(token, tokenSecret, profile, done) {
  process.nextTick(function() {
    User.findOne({'google.id':profile.id}, function(err,user) {
      if (err) return done (err);
      if (user) return done (null, user);
      else {
        var newUser = new User();
        newUser.google.id = profile.id;
        newUser.google.token = token;
        newUser.google.name = profile.displayName;
        newUser.save(function(err) {
          if(err) throw err;
          return done(null, newUser);
          console.log(profile);
        })
      }
    })
  })
}))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
