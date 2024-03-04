const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../utilities/jwt');

const prisma = new PrismaClient();

async function authUser(req, res, next) {
    try {
        let token = req.headers?.authorization?.split(' ');

        if (token?.[0]?.toLowerCase() === 'bearer') {
            const decoded = verifyToken(token[1]);

            const user = await prisma.account.findUnique({
                where: {
                    email: decoded.email
                },
                include: {
                    role: true,
                    information: true,
                }
            });

            if (user) {
                req.authenticate = {
                    email: user.email,
                    id: user.id,
                    name: user.information.name,
                    role: user.role.name
                }
                next()
            }
        } else {
            throw ({
                status: 401,
                message: "You are not authorized!"
            })
        }
    } catch (error) {
        next({
            error
        });
    }
}

async function authAdmin(req, res, next) {
    try {
        let token = req.headers.authorization.split(' ');

        if (token?.[0]?.toLowerCase() === 'bearer') {
            const decoded = verifyToken(token[1]);

            const user = await prisma.account.findUnique({
                where: {
                    email: decoded.email
                },
                include: {
                    role: true
                }
            });

            if (user && user.role.name === 'admin') {
                req.authenticate = {
                    email: user.email,
                    id: user.id,
                    role: user.role.name
                }
                next()
            } else {
                throw ({
                    status: 401,
                    message: "You are not authorized!"
                })
            }
        } else {
            throw ({
                status: 401,
                message: "You are not authorized!"
            })
        }
    } catch (error) {
        next({
            error
        });
    }
}

module.exports = {
    authUser,
    authAdmin
}