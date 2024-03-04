const routes = require('express').Router();
const { authUser } = require('../../middlewares/authentication');
const TransactionApiController = require('../../modules/transaction/api.controller');

routes.use(authUser);
routes.get('/', TransactionApiController.getTransaction);
routes.post('/', TransactionApiController.create);

module.exports = routes;