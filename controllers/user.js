const hash = require('password-hash');
const jwt = require('jsonwebtoken');
const express = require('express');
const config = require('../config');
const User = require('../models/user');

module.exports = {
  register: function(req,res) {
    var newUser = User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hash.generate(req.body.password)
    })
    newUser.save(function(err) {
      if (err) throw (err);
      res.send(newUser)
    })
  },
  login: function(req,res) {
    User.findOne({username:req.body.username}).then(function(data) {
      if(!data) res.send('user not found')
      if(hash.verify(req.body.password, data.password) == false) res.send('wrong password')
      else res.send(jwt.sign({username:data.username,email:data.email,email:data.email},config.localAuth.secret))
    })
  }
}
