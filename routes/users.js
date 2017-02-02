var express = require('express');
var router = express.Router();
var passport = require('passport')
var usersController = require('../controller/usersController.js')
// var passport = require('../config/passport.js')

/* GET users listing. */
module.exports = function(app, passport){
  app.get('/', usersController.getAllUser);
  app.post('/', usersController.createUser);
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  app.get('/login', passport.authenticate('local'),
    function(req, res) {
      res.json({req: req, res: res});
  })
}
