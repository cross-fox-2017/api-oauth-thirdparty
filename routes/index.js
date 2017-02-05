var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')
var passport = require('passport')

router.get('/user/signIn',userController.signIn)

router.post('/signup', passport.authenticate('local-signup',{
  successRedirect:{msg:"success"},
  failureRedirect:{msg:"fail"},
  failureFlash:true
}))

router.post('/login',passport.authenticate('local-login',{
  successRedirect:'/user/signIn',
  failureRedirect:{msg:"fail"},
  failureFlash:true
}))

module.exports = router
