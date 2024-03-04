const routes = require('express').Router();
const { authUser } = require('../../middlewares/authentication');
const AttendanceApiController = require('../../modules/attendance/api.controller');

routes.use(authUser);
routes.get('/', AttendanceApiController.fetchAllAttendance);
routes.get('/:type', AttendanceApiController.currentAttendance);
routes.post('/', AttendanceApiController.attendanceClock);

module.exports = routes;