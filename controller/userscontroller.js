'use strict'
var users = require('../models/user.js')
var hash = require('password-hash')

var usersController = {
  getAllUser: function(req, res){
    users.find({}, function(err, users){
      if(err) throw err;
      res.json(users)
    })
  },
  createUser: function(req,res){
    let username = req.body.username
    let password = hash.generate(req.body.password)
    let email = req.body.email
    let data = {
      username: username,
      password: password,
      email: email
    }
    var newUser = new users(data)
    newUser.save(function(err){
      if(err) throw err;
      res.json({
        msg: 'User Created',
        username: data.username,
        password: '[Encrypted]',
        email: data.email
      })
    })
  }
}

module.exports = usersController
