const routes = require('express').Router();
const AuthenticationApiController = require('../../modules/authentication/api.controller');

routes.post('/login', AuthenticationApiController.login);
routes.post('/register', AuthenticationApiController.register);

module.exports = routes;