const routes = require('express').Router();
const RoutesApi = require('./api');
const DashboardApi = require('./admin');

routes.use('/api', RoutesApi);
routes.use('/dashboard', DashboardApi);

module.exports = routes;