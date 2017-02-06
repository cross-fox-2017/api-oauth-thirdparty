let express = require('express')
let passport = require('passport')
let router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})

router.get('/auth/twitter/login', passport.authenticate('twitter'))

router.get('/auth/google/login', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/auth/facebook/login', passport.authenticate('facebook', {scope: 'email'}))

router.use('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

router.use('/auth/google/callback', passport.authenticate('google', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

router.use('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))


router.get('/auth/login/failed', function (req, res) {
  res.send('error')
})

router.get('/auth/login/success', function (req, res) {
  res.render('home')
})

module.exports = router
