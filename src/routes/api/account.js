const routes = require('express').Router();
const { authUser } = require('../../middlewares/authentication');
const AccountApiController = require('../../modules/account/api.controller');

routes.use(authUser);
routes.get('/', AccountApiController.getUserData);
routes.put('/information', AccountApiController.updateInformation);
routes.put('/security', AccountApiController.updateSecurity);

module.exports = routes;