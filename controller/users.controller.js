var hash = require('password-hash')
const db = require('../models');
const users = db.User
var jwt = require('jsonwebtoken')
var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, cb) {
    users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

module.exports={
  signUp: function(req,res){
    user.create({
      name:req.body.name,
      email:req.body.email,
      username:req.body.username,
      password:req.body.password
    }).then(function(data){
      res.send(data)
    })
  },
  signIn: function(req,res){
    passport.authenticate('local', { failureRedirect: '/login' }),
      function(req, res) {
        res.send('you are logged in');
    }
  }

}
