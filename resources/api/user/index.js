var router = require('express').Router();
const controller = require('./user.controller');
const checkAuth = require('../../middleware/check-auth');

// Section Users

// Get All Users

router.get( '/', checkAuth, controller.getAllUsers);

// Get User

router.get( '/:user', checkAuth, controller.getUser);

// Update User

router.patch( '/:user', checkAuth, controller.updateUser);

// Delete user

router.delete( '/:user', checkAuth, controller.deleteUser);

module.exports = router;
