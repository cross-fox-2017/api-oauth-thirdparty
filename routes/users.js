var express = require('express')
var router = express.Router()
var passport = require('passport')
var usersController = require('../controllers/controller.user')
// var passport = require('../config/passport.js')

/* GET users listing. */
module.exports = function (app, passport) {
  /* signup local */
  app.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/signup',
    failureFlash: true
  }), function (req, res) {
    res.json({req: req, res: res})
  })
  /* if sing up fell go to here */
  app.get('/signup', function (req, res) {
    res.send('signup page')
  })

  /* login local */
  app.get('/login', passport.authenticate('local'),
    function (req, res) {
      res.json({req: req, res: res})
    })

  /* login post */
  app.post('/login', passport.authenticate('localRegister', {
    failureRedirect: '/login'
  }), function (req, res) {
    res.redirect('/')
  })

  /* logout */
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  /* facebook */
  app.get('/auth/facebook/login', passport.authenticate('facebook', {scope: 'email'}))
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }), function (req, res) {
    console.log('success')
  })

  /* twitter */
  app.get('/auth/twitter/login', passport.authenticate('twitter'))
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }), function (req, res) {
    console.log('success')
  })

  /* google */
  app.get('/auth/google/login', passport.authenticate('google', {scope: ['profile', 'email']}))
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }), function (req, res) {
    console.log('success')
  })

  /* github */
  app.get('/auth/github/login', passport.authenticate('github', { scope: [ 'user:email' ] }))
  app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }), function (req, res) {
    console.log('success')
  })
}
