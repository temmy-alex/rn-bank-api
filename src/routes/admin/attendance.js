const routes = require('express').Router();
const { authAdmin } = require('../../middlewares/authentication');
const AttendanceApiController = require('../../modules/attendance/api.controller');

routes.use(authAdmin);
routes.get('/', AttendanceApiController.fetchAllAttendance);

module.exports = routes;