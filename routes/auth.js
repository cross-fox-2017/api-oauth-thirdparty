let express = require('express')
let passport = require('passport')
let router = express.Router()

router.get('/twitter/login', passport.authenticate('twitter'))

router.get('/google/login', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/facebook/login', passport.authenticate('facebook', {
  scope: 'email'
}))

router.use('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failed'
}))

router.use('/google/callback', passport.authenticate('google', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failed'
}))

router.use('/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/login/success',
  failureRedirect: '/login/failed'
}))

router.get('/login/failed', function(req, res) {
  res.send('Auth login failed.')
})

router.get('/login/success', function(req, res) {
  res.send('Auth login success')
})

module.exports = router
