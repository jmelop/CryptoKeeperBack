var router = require('express').Router();
const controller = require('./cryptotype.controller');
const checkAuth = require('../../middleware/check-auth');

// Section Cryptotype

// Get All Cryptotype

router.get( '/', checkAuth, controller.getAllCryptoTypes);

// Get Cryptotype

router.get( '/:cryptotype', checkAuth, controller.getCryptoType);

// Add crypto

router.post( '/', checkAuth, controller.addCryptoType);

module.exports = router;