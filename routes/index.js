var express = require('express');
var router = express.Router();
var userCon = require('../controller/users.controller.js')
/* GET home page. */
router.post('/login',userCon.signIn)

router.get('/signup',userCon.signUp)


module.exports = router;
