const { PrismaClient } = require('@prisma/client');
const { checkPassword } = require('../../../utilities/bcrypt');
const { generateToken } = require('../../../utilities/jwt');

const prisma = new PrismaClient();

exports.loginUser = async ({
    email,
    password
}) => {
    try {
        if (!password || !email) throw ({
            status: 400,
            message: 'Email and password required!'
        });

        const exist = await prisma.account.findUnique({
            where: {
              email: email,
            },
            include: {
                role: true,
                information: true,
            }
        });

        if (!exist) throw ({
            status: 400,
            message: 'Email or Password incorrect!'
        });

        if(!checkPassword(password, exist.password)) throw({ status: 400, message: 'Email or Password incorrect!'});

        let token = generateToken({
            email: exist.email
        });

        return {
            accessToken: token,
            user: {
                name: exist.information.name,
                email: exist.email,
                role: exist.role.name,
            }
        };
    } catch (error) {
        throw (error)
    }
}