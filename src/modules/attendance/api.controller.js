const { fetchAttendance } = require("./get/attendance");
const { fetchTodayAttendance } = require("./get/current_attendance");
const { clockAttendance } = require("./post/attendance");


class AttendanceApiController {
    static async attendanceClock(req, res, next) {
        try {
            await clockAttendance({
                type: req.body.type,
                authenticate: req.authenticate,
            });

            res.status(200).json({
                success: true,
                message: 'Success record attendance'
            })
        } catch (error) {
            next({
                error
            })
        }
    }

    static async fetchAllAttendance(req, res, next){
        try {
            const data = await fetchAttendance({
                from: req.query.from,
                to: req.query.to,
                authenticate: req.authenticate,
                pagination: req.query.page,
                limit: req.query.limit,
            });

            res.status(200).json({
                success: true,
                message: 'Success get all record attendance',
                data: data
            })
        } catch (error) {
            next({
                error
            })
        }
    }

    static async currentAttendance(req, res, next){
        try {
            const data = await fetchTodayAttendance({
                type: req.params.type,
                authenticate: req.authenticate,
            });

            res.status(200).json({
                success: true,
                message: 'Success get record attendance',
                data: data
            })
        } catch (error) {
            next({
                error
            })
        }
    }
}

module.exports = AttendanceApiController;