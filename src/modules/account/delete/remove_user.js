const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.removeUser = async ({
    userId,
}) => {
    try {
        const exist = await prisma.account.findUnique({
            where: {
                id: userId
            }
        });

        if(!exist) throw({
            status: 404,
            message: 'User does not exist!'
        });

        await prisma.$transaction(
            [
                prisma.attachment.deleteMany({
                    where: {
                        accountId: userId,
                    }
                }),
                prisma.accountInformation.delete({
                    where: {
                        accountId: userId,
                    }
                }),
                prisma.accountAttendance.deleteMany({
                    where: {
                        accountId: userId,
                    }
                }),
                prisma.account.delete({
                    where: {
                        id: userId,
                    }
                }),
            ]
        )
    } catch (error) {
        throw (error)
    }
}