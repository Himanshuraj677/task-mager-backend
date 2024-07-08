const linkRouter = require('express').Router();
const createLink = require('../controller/link/createLinkController');
const removeLink = require('../controller/link/removeLinkController');
const updateLink = require('../controller/link/updateLink_controller');
const getLink = require('../controller/link/getLinkController');
const getAllLink = require('../controller/link/getAllLinkController');
const {redirectLink} = require('../controller/link/redirectLinkController');

linkRouter
 .post('/', createLink)
 .delete('/:id', removeLink)
 .put('/:id', updateLink)
 .get('/:id', getLink)
 .get('/', getAllLink)
 .get('/redirect/:shortened_url', redirectLink)

module.exports = linkRouter;