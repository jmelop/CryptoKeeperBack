var router = require('express').Router();
const controller = require('./user.controller');

// Section Users

// Get All Users

router.get( '/', controller.getAllUsers);

// Get User

router.get( '/:user', controller.getUser);

// Update User

router.patch( '/:user', controller.updateUser);

// Delete user

router.delete( '/:user', controller.deleteUser);

module.exports = router;