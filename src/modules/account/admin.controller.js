const { removeUser } = require("./delete/remove_user");
const { getUserData } = require("./get/all_user");
const { saveFirebaseToken } = require("./post/register_firebase_token");
const { registerUser } = require("./post/register_user");
const { updateInfo } = require("./put/information");


class AccountAdminController {
    static async getAllUser(req, res, next) {
        try {
            const data = await getUserData({
                pagination: req.query.page,
                limit: req.query.limit,
            });

            res.status(200).json({
                success: true,
                message: 'Success get all data information',
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
            await updateInfo({
                profile: req.body.profile,
                phone: req.body.phone,
                authenticate: req.authenticate,
                userId: req.params.id,
            });

            res.status(200).json({
                success: true,
                message: 'Success update personal information'
            })
        } catch (error) {
            next({
                error
            })
        }
    }

    static async addUser(req, res, next) {
        try {
            await registerUser({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                position: req.body.position,
            });
                
            res.status(200).json({
                success: true,
                message: 'Success add user',
            })
        } catch (error) {
            next({
                error
            })
        }
    }

    static async addUserToken(req, res, next) {
        try {
            await saveFirebaseToken({
                token: req.body.token,
                authenticate: req.authenticate,
            });
                
            res.status(200).json({
                success: true,
                message: 'Success save user firebase token',
            })
        } catch (error) {
            console.log(error);
            next({
                error
            })
        }
    }

    static async remove(req, res, next) {
        try {
            await removeUser({
                userId: req.params.id
            });
                
            res.status(200).json({
                success: true,
                message: 'Success remove user',
            })
        } catch (error) {
            next({
                error
            })
        }
    }
}

module.exports = AccountAdminController;