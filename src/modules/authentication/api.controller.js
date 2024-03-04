const { loginUser } = require("./post/login");
const { registerUser } = require("./post/register");

class AuthenticationApiController {
    static async login(req, res, next) {
        try {
            const data = await loginUser({
                email: req.body.email,
                password: req.body.password
            });

            res.status(200).json({
                success: true,
                message: 'Success login',
                data: {
                    accessToken: data.accessToken,
                    user: data.user
                }
            })
        } catch (error) {
            next({
                error
            })
        }
    }

    static async register(req, res, next) {
        try {
            await registerUser({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
            });
            
            res.status(200).json({
                success: true,
                message: 'Success register',
            })
        } catch (error) {
            next({
                error
            })
        }
    }
}

module.exports = AuthenticationApiController;