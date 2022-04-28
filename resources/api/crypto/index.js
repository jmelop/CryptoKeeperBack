var router = require('express').Router();
const controller = require('./crypto.controller');
const checkAuth = require('../../middleware/check-auth');

// Section Cryptos

// Get All Cryptos

router.get( '/', checkAuth, controller.getAllCryptos);

// Get Crypto

router.get( '/:id', checkAuth, controller.getCrypto);

// Add crypto

router.post( '/', checkAuth, controller.addCrypto);

// Update crypto

router.patch( '/:id', checkAuth, controller.updateCrypto);

// Delete crypto

router.delete( '/:id', checkAuth, controller.deleteCrypto);

module.exports = router;