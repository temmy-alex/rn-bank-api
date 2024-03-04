const { PrismaClient } = require('@prisma/client');
const { generateUUID } = require('../../../utilities/uuid');

const prisma = new PrismaClient();

exports.createTransactions = async ({ totalAmount, title, description, method, authenticate }) => {
    try {
        await prisma.transactionAccount.create({
            data: {
                id: generateUUID(),
                amount: Number(totalAmount),
                totalPayment: Number(totalAmount),
                title,
                description,
                method: method,
                accountId: authenticate.id,
            }
        })
    } catch (error) {
        throw (error)
    }
}