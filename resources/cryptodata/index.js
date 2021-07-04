var router = require('express').Router();

const controller = require('./cryptodata.controller');

// Section Cryptodata

// Get All Cryptodata

router.get( '/', controller.getAllCryptos),

// Get Cryptodata

router.get( '/:cryptodata', controller.getCrypto),

module.exports = router;