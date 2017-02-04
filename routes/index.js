var express = require('express')
var router = express.Router()
var userController = require('../controllers/user')
var passport = require('passport')

/* GET home page. */
router.post('/signup', userController.signupUser)
router.post('/signin', userController.signinUser)

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/out'
}))

router.get('/home', function (req, res) {
  res.send('Welcome home !')
})

router.get('/out', function (req, res) {
  res.send('Who the %^&*( are you ! get OUT !!!')
})
module.exports = router
