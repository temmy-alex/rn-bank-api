const { PrismaClient } = require('@prisma/client');
const { hashPassword, checkPassword } = require('../../../utilities/bcrypt');

const prisma = new PrismaClient();

exports.updateSecurity = async ({
    oldPassword,
    password,
    confirmPassword,
    authenticate,
}) => {

    try {
        if(!oldPassword) throw ({
            status: 400,
            message: 'You need to insert the old password'
        });

        if ((password & !confirmPassword) || (!password & confirmPassword)) throw ({
            status: 400,
            message: 'Password and Confirm Password Required'
        });

        if((password !== confirmPassword)) throw ({
            status: 400,
            message: 'Password and Confirm Password does not match!'
        });

        const exist = await prisma.account.findUnique({
            where: {
                id: authenticate?.id
            }
        });

        if(!exist) throw({
            status: 404,
            message: 'User does not exist!'
        });

        if(!checkPassword(oldPassword, exist?.password)) throw ({
            status: 400,
            message: 'Old Password and Exist Password does not match!'
        });

        await prisma.account.update({
            where: {
                id: authenticate?.id
            }, 
            data: {
                password: hashPassword(password)
            }
        });
    } catch (error) {
        throw (error)
    }
}