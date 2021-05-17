var router = require('express').Router();

const controller = require('./crypto.controller');


// Section Cryptos

// Get All Cryptos

router.get( '/', controller.getAllCryptos),

// Get Crypto

router.get( '/:crypto', controller.getCrypto),

// Add crypto

router.post( '/', controller.addCrypto),

// Update crypto

router.patch( '/:crypto', controller.updateCrypto),

// Delete crypto

router.delete( '/:crypto', controller.deleteCrypto)

module.exports = router;