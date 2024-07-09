const linkRouter = require('express').Router();
const createLink = require('../controller/link/createLinkController');
const redirectLink = require('../controller/link/redirectLinkController');
const trackLinkController = require('../controller/link/trackingLinkController');
const trackingMiddleware = require('../middleware/tracking')

linkRouter
 .post('/', createLink)
 .post('/redirect/:shortened_url', trackingMiddleware, redirectLink)
 .get('/track/:tracking_id', trackLinkController);

module.exports = linkRouter;


