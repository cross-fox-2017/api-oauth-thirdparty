var express    = require('express');
var router     = express.Router();
var controller = require('../../controller/users.controller.js')


router.get('/', controller.getAllUser)
//
// router.get('/:id', controller.verifyUser, controller.getUser)
//
// router.post('/', controller.verifyAdmin, controller.createUser)
//
// router.delete('/:id', controller.verifyUser, controller.deleteUser)
//
// router.put('/:id', controller.verifyUser, controller.updateUser)

module.exports = router;
