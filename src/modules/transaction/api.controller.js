const { getTransactions } = require("./get/get_transaction");
const { createTransactions } = require("./post/create_transaction");

class TransactionApiController {
    static async getTransaction(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                message: 'Success get transactions',
                data: await getTransactions({
                    authenticate: req.authenticate,
                })
            })
        } catch (error) {
            next({
                error
            })
        }
    }

    static async create(req, res, next) {
        try {
            await createTransactions({
                title: req.body.title,
                description: req.body.description,
                totalAmount: req.body.totalAmount,
                method: req.body.method,
                authenticate: req.authenticate,
            })

            res.status(200).json({
                success: true,
                message: 'Success create transaction',
            })
        } catch (error) {
            console.log(error);
            next({
                error
            })
        }
    }
}

module.exports = TransactionApiController;