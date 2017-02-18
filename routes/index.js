var express = require('express');
var router = express.Router();
const passport = require('passport');
const controllers = require('../controllers/user');

/* GET home page. */
router.post('/register', controllers.register);
router.post('/login', controllers.login);

router.get('/auth/facebook', passport.authenticate('facebook'))
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/'
}))

router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/'
}))

router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}))
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/'
}))

router.get('/profile', function(req,res) {
  res.send('LOGIN SUCCESS')
})

router.get('/', function(req,res) {
  res.send('LOGIN FAIL')
})

module.exports = router;
