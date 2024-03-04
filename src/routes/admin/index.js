const routes = require('express').Router();
const AttendanceRoutes = require('./attendance');
const AccountRoutes = require('./account');

routes.use('/accounts', AccountRoutes);
routes.use('/attendances', AttendanceRoutes);

module.exports = routes;