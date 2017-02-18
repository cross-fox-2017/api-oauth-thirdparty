var express    = require('express');
var router     = express.Router();
var controller = require('../../controller/users.controller.js')

var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;


// SIGN IN
router.post('/', controller.signIn)

router.get('/twitter',
  passport.authenticate('twitter'));

module.exports = router;
