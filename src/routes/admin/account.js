const routes = require('express').Router();
const { authAdmin } = require('../../middlewares/authentication');
const AccountAdminController = require('../../modules/account/admin.controller');

routes.use(authAdmin);
routes.get('/', AccountAdminController.getAllUser);
routes.put('/information/:id', AccountAdminController.updateInformation);
routes.post('/', AccountAdminController.addUser);
routes.post('/firebase', AccountAdminController.addUserToken);
routes.delete('/:id', AccountAdminController.remove);

module.exports = routes;