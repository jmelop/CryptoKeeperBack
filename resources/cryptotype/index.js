var router = require('express').Router();
const controller = require('./cryptotype.controller');

// Section Cryptotype

// Get All Cryptotype

router.get( '/', controller.getAllCryptoTypes);

// Get Cryptotype

router.get( '/:cryptotype', controller.getCryptoType);

// Add crypto

router.post( '/', controller.addCryptoType);

module.exports = router;