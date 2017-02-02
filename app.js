var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
// const FacebookTokenStrategy = require('passport-facebook-token');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/oauth');
mongoose.Promise = global.Promise;

var app = express();

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

app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new FacebookTokenStrategy({
//       clientID: "267057420394411",
//       clientSecret: "0201668b55a2a69a5f912d00a0fce1cc"
//   },
//   function(accessToken, refreshToken, profile, done) {
//       User.handleAuthentication(accessToken, refreshToken, profile, done, function(err, user) {
//           console.log("handleAuthentication user is " + JSON.stringify(user));
//           console.log("handleAuthentication error is " + JSON.stringify(err));
//           done(err, user);
//       });
//   }
// ));

app.use('/', index);
app.use('/api/users', users);
app.use('/api', api);

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
