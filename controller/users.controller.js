var hash = require('password-hash')
var jwt = require('jsonwebtoken')
var express = require('express');
var passport = require('passport');

module.exports={
  signUp: function(req,res){
    var newUser = User({
      name:req.body.name,
      email:req.body.email,
      username:req.body.username,
      password:req.body.password,
    });
    newUser.save(function(err) {
      if (err) throw err;
      res.send(newUser);
    });
  },
  signIn: function(req,res){
    User.findOne({username:req.body.username}).then(function(user){
      console.log(user.password);
      if(!user){
        res.send('user not found!')
      }
      else if(user.password !== req.body.password){
        res.send('wrong pass!')
      }
      else{
        var token = jwt.sign({username:user.username,email:user.email},'secret')
        res.send({token:token})
      }
    })
  }
}
