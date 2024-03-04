const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getUserData = async ({
    limit,
    pagination,
}) => {
    try {
        const size = Number(limit) || 100;
        const page = Number((pagination - 1 )) * Number(size) || 0;

        const data = await prisma.account.findMany({
            select: {
                id: true,
                email: true,
                phone: true,
                information: true
            },
            skip: page,
            take: size,
        });

        return data
    } catch (error) {
        throw (error)
    }
}