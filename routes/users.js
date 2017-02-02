var express = require('express');
var router = express.Router();
var usersController = require('../controller/usersController.js')

/* GET users listing. */
router.get('/', usersController.getAllUser);
router.post('/', usersController.createUser);

module.exports = router;
