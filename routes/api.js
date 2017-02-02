var express = require('express');
var router = express.Router();

const Users = require('../models/users');
const controller = require('../controllers/oauth');
const oauth = require('../auth');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate')
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
    clientID: '267057420394411',
    clientSecret: '0201668b55a2a69a5f912d00a0fce1cc'
  }, function(accessToken, refreshToken, profile, done) {
    // Users.findOrCreate({id: profile.id}, function (error, user) {
      console.log(accessToken, refreshToken, profile, done);
      console.log("OK");
      return done(error, user);
    // });
  }
));

// passport.use(new FacebookTokenStrategy({
//     clientID        : "267057420394411",
//     clientSecret    : "0201668b55a2a69a5f912d00a0fce1cc"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log(profile);
//     console.log("OK");
//     var user = {
//         'email': profile.emails[0].value,
//         'name' : profile.name.givenName + ' ' + profile.name.familyName,
//         'id'   : profile.id,
//         'token': accessToken
//     }
//
//     // You can perform any necessary actions with your user at this point,
//     // e.g. internal verification against a users table,
//     // creating new user entries, etc.
//
//     return done(null, user); // the user object we just made gets passed to the route's controller as `req.user`
//   }
// ));

router.post('/signin', controller.signin)

router.post('/auth/facebook/token', passport.authenticate('facebook-token'), controller.signinFacebook)


module.exports = router;
