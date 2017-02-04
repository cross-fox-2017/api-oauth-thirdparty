var express = require('express');
var router = express.Router();
const controller = require('../controllers/users')

/* GET users listing. */
router.post('/', controller.signup)

router.get('/', controller.verify, controller.getUsers)

router.delete('/:id', controller.verify, controller.delete)

module.exports = router;
