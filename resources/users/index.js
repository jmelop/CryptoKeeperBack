var router = require('express').Router();

const controller = require('../users/users.controller');


// Section Users

// Get All Users

router.get( '/', controller.getAllUsers),

// Add User

router.post( '/', controller.addUser)

module.exports = router;