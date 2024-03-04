const routes = require('express').Router();
const { authUser } = require('../../middlewares/authentication');
const { uploadImage } = require('../../middlewares/upload');
const UploadApiController = require('../../modules/upload/api.controller');

routes.use(authUser);
routes.post('/', uploadImage.any(), UploadApiController.upload);

module.exports = routes;