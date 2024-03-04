const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getOwnData = async ({
    authenticate,
}) => {
    try {
        const exist = await prisma.account.findUnique({
            where: {
                id: authenticate?.id
            },
            select: {
                id: true,
                email: true,
                phone: true,
                information: true,
                financial: true,
            }
        });

        if(!exist) throw({
            status: 404,
            message: 'User does not exist!'
        });

        return exist
    } catch (error) {
        throw (error)
    }
}