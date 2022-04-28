var router = require('express').Router();
const controller = require('./news.controller');
const checkAuth = require('../../middleware/check-auth');

// Section News

// Get All News

router.get( '/', checkAuth, controller.getAllNews);

// Get News

router.get( '/:id', checkAuth, controller.getNews);

// Add News

router.post( '/', checkAuth, controller.addNews);

// Update News

router.patch( '/:id', checkAuth, controller.updateNews);

// Delete News

router.delete( '/:id', checkAuth, controller.deleteNews);

module.exports = router;
