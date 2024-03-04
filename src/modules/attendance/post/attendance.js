const { PrismaClient } = require('@prisma/client');
const { generateUUID } = require('../../../utilities/uuid');
const moment = require('moment');

const prisma = new PrismaClient();

exports.clockAttendance = async ({
    type,
    authenticate,
}) => {
    const typeList = ['IN', 'OUT'];

    try {
        if (!type) throw ({
            status: 400,
            message: 'Attendance Type required!'
        });

        if(!typeList.includes(type)) throw ({
            status: 400,
            message: 'Attendance Should be IN/OUT'
        });

        const currentDate = moment().format();
        const currentTime = moment().format();

        const exist = await prisma.accountAttendance.findFirst({
            where: {
                clockDate: currentDate,
                attendance: type,
                accountId: authenticate?.id
            }
        });

        if(exist) throw({
            status: 400,
            message: 'Attendance with this type already exist today!'
        });

        await prisma.accountAttendance.create({
            data: {
                id: generateUUID(),
                clockDate: currentDate,
                clockTime: currentTime,
                attendance: type,
                accountId: authenticate?.id
            }
        })
    } catch (error) {
        throw (error)
    }
}