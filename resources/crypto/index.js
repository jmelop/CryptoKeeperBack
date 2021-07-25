var router = require('express').Router();

const controller = require('./crypto.controller');

// Section Cryptos

// Get All Cryptos

router.get( '/', controller.getAllCryptos),

// Get Crypto

router.get( '/:id', controller.getCrypto),

// Add crypto

router.post( '/', controller.addCrypto),

// Update crypto

router.patch( '/:id', controller.updateCrypto),

// Delete crypto

router.delete( '/:id', controller.deleteCrypto)

module.exports = router;