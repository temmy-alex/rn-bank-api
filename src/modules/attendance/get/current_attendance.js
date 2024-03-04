const {
    PrismaClient
} = require('@prisma/client');
const {
    checkPassword
} = require('../../../utilities/bcrypt');
const {
    generateToken
} = require('../../../utilities/jwt');
const moment = require('moment');

const prisma = new PrismaClient();

exports.fetchTodayAttendance = async ({
    type,
    authenticate,
}) => {
    try {
        const startDate = moment().format();

        const data = await prisma.accountAttendance.findFirst({
            where: {
                clockDate: startDate,
                attendance: type,
                accountId: authenticate.id,
            },
            select: {
                id: true,
                clockDate: true,
                clockTime: true,
                attendance: true,
            }
        })

        return data;
    } catch (error) {
        throw (error)
    }
}