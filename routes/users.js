var express = require('express');
var router = express.Router();
var passport = require('passport')
var usersController = require('../controller/usersController.js')
// var passport = require('../config/passport.js')

/* GET users listing. */
module.exports = function(app, passport){
  // app.get('/', usersController.getAllUser);
  // app.post('/', usersController.createUser);
  app.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/signup',
    failureFlash: true
  }), function(req, res){
    res.json({req: req, res: res})
  });
  app.get('/signup', function(req, res){
    res.send('signup page')
  })
  app.get('/login', passport.authenticate('local'),
    function(req, res) {
      res.json({req: req, res: res});
  });
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))
  app.get('/auth/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/',
    failureRedirect: '/signup'
  }), function(req, res){
    console.log('success');
  })
  app.get('/auth/twitter', passport.authenticate('twitter'))
  app.get('/auth/twitter/callback', passport.authenticate('twitter',{
    successRedirect: '/',
    failureRedirect: '/signup'
  }), function(req, res){
    console.log('success');
  })
  app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
  app.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect: '/',
    failureRedirect: '/signup'
  }), function(req, res){
    console.log('success');
  })
  app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
  app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }), function(req, res) {
      console.log('success');
    });

  app.post('/login', passport.authenticate('localRegister', {
    failureRedirect : '/login'
  }), function(req, res) {
    res.redirect('/');
  });
}
