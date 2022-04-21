var router = require('express').Router();
const controller = require('./cryptodata.controller');

// Section Cryptodata

// Get All Cryptodata

router.get( '/', controller.getAllCryptos);

// Get Cryptodata

router.get( '/:cryptodata', controller.getCrypto);

// Add crypto

router.post( '/', controller.addCrypto);

module.exports = router;