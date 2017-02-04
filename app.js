require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


mongoose.Promise = global.Promise;
const configDB = require('./config/database.js');//connect to mongoDB
mongoose.connect(configDB.url)

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



//required for passport
app.use(session({secret: process.env.SESSION_SECRET}))
app.use(passport.initialize())
app.use(passport.session())//persistent login sessions
app.use(flash());//use connect-flash for flash message stored in session


// var index = require('./routes/index');
// var users = require('./routes/users');
// app.use('/', index);
// app.use('/users', users);
require('./app/routes.js')(app, passport)//proses routing dipindah ke folder app/routes.js, jika empat sintak diatas diaktifkan, maka routing akan di tulis di rotes





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
