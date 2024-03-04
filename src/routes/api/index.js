const routes = require('express').Router();
const AuthRoutes = require('./authentication');
const AttendanceRoutes = require('./attendance');
const AccountRoutes = require('./account');
const UploadRoutes = require('./upload');
const TransactionRoutes = require('./transaction');

routes.use('/auths', AuthRoutes);
routes.use('/attendances', AttendanceRoutes);
routes.use('/transactions', TransactionRoutes);
routes.use('/accounts', AccountRoutes);
routes.use('/uploads', UploadRoutes);

module.exports = routes;