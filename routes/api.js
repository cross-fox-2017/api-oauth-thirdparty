var express = require('express');
var router = express.Router();

const Users = require('../models/users');
const controller = require('../controllers/auth');

router.post('/signin', controller.signin)

module.exports = router;
