var express = require('express');
var router = express.Router();
var userCon = require('../controller/users.controller.js')
var passport = require('passport')
const User = require('../models/user.js')

//signup dan sign in local
router.post('/signup',userCon.signUp)
router.post('/login',userCon.signIn)
//sign in w/ facebook
router.get('/auth/facebook',passport.authenticate('facebook'))

router.get('/auth/facebook/callback',passport.authenticate('facebook',{
  successRedirect: '/profile',
  failureRedirect: '/'
}))
//sign in w/ twitter
router.get('/auth/twitter',passport.authenticate('twitter'))

router.get('/auth/twitter/callback',passport.authenticate('twitter',{
  successRedirect: '/profile',
  failureRedirect: '/'
}))
//sign in w/ google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))

router.get('/auth/google/callback',passport.authenticate('google',{
  successRedirect: '/profile',
  failureRedirect: '/'
}))

router.get('/profile',function(req,res){
  res.send('OK MAMEN BERHASIL')
})
router.get('/',function(req,res){
  res.send('OK MAMEN GAGAL')
})


module.exports = router;
