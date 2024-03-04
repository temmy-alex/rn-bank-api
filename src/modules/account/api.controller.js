const { getOwnData } = require("./get/self_information");
const { updateInfo } = require("./put/information");
const { updateSecurity } = require("./put/security");


class AccountApiController {
    static async getUserData(req, res, next) {
        try {
            const data = await getOwnData({
                authenticate: req.authenticate,
            });

            res.status(200).json({
                success: true,
                message: 'Success get data information',
                data: data
            })
        } catch (error) {
            next({
                error
            })
        }
    }

    static async updateInformation(req, res, next) {
        try {
            const data = await updateInfo({
                profile: req.body.profile,
                phone: req.body.phone,
                name: req.body.name,
                authenticate: req.authenticate,
            });

            res.status(200).json({
                success: true,
                message: 'Success update personal information',
                data: data,
            })
        } catch (error) {
            next({
                error
            })
        }
    }

    static async updateSecurity(req, res, next){
        try {
            await updateSecurity({
                oldPassword: req.body.oldPassword,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                authenticate: req.authenticate,
            });

            res.status(200).json({
                success: true,
                message: 'Success update security password',
            })
        } catch (error) {
            next({
                error
            })
        }
    }
}

module.exports = AccountApiController;