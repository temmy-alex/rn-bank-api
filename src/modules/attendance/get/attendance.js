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

exports.fetchAttendance = async ({
    from,
    to,
    pagination,
    limit,
    authenticate,
}) => {
    try {
        const startDate = from ? moment(
            `${moment(from).add(1, 'd').format('YYYY-MM-DD')} ${'00:00'}`,
            'YYYY-MM-DD HH:mm'
        ).format() : moment(
            `${moment().startOf('month').add(1, 'd').format('YYYY-MM-DD')} ${'00:00'}`,
            'YYYY-MM-DD HH:mm'
        ).format();
        const endDate = to ? moment(
            `${moment(to).add(1, 'd').format('YYYY-MM-DD')} ${'23:59'}`,
            'YYYY-MM-DD HH:mm'
        ).format() : moment(
            `${moment().add(1, 'd').format('YYYY-MM-DD')} ${'23:59'}`,
            'YYYY-MM-DD HH:mm'
        ).format();
        const size = Number(limit) || 100;
        const page = Number((pagination - 1)) * Number(size) || 0;

        let data = [];

        if (authenticate.role === 'admin') {
            data = await prisma.accountAttendance.findMany({
                where: {
                    clockDate: {
                        gte: startDate,
                        lte: endDate,
                    }
                },
                select: {
                    id: true,
                    clockDate: true,
                    clockTime: true,
                    attendance: true,
                    account: {
                        select: {
                            id: true,
                            email: true,
                            information: {
                                select: {
                                    name: true,
                                    position: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    clockDate: 'desc'
                },
                take: size,
                skip: page
            })
        } else {
            const res = await prisma.accountAttendance.groupBy({
                by: ['clockDate'],
                where: {
                    clockDate: {
                        gte: startDate,
                        lte: endDate,
                    },
                    accountId: authenticate.id,
                },
                orderBy: {
                    clockDate: 'desc'
                },
                take: size,
                skip: page
            });

            for (let i = 0; i < res.length; i++) {
                const list = await prisma.accountAttendance.findMany({
                    where: {
                        clockDate: res[i].clockDate,
                        accountId: authenticate.id,
                    }
                });

                data.push(list);
            }
        }


        return data;

    } catch (error) {
        console.log(error);
        throw (error)
    }
}