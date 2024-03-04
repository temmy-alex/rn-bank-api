const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getTransactions = async ({ authenticate }) => {
    try {
        return await prisma.transactionAccount.findMany({
            where: {
                accountId: authenticate.id,
            }
        })
    } catch (error) {
        throw (error)
    }
}