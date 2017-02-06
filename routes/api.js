var express = require('express');
var router = express.Router();
let userController = require('../controller/controllerUsers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get', userController.verifyToken, userController.findAll)

router.post('/signin', userController.signIn)

router.post('/signup', userController.signUp)

module.exports = router;
