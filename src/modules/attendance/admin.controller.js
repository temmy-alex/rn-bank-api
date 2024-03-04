const { fetchAttendance } = require("./get/attendance");

class AttendanceAdminController {

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
}

module.exports = AttendanceAdminController;