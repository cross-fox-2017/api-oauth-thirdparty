var express    = require('express');
var router     = express.Router();
var controller = require('../../controller/users.controller.js')

// SIGN UP
router.post('/', controller.signUp)

module.exports = router;
