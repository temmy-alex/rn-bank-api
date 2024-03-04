const { PrismaClient } = require('@prisma/client');
const { generateUUID } = require('../../../utilities/uuid');

const prisma = new PrismaClient();

exports.saveFirebaseToken = async ({
    authenticate,
    token,
}) => {
    try {
        const exist = await prisma.accountToken.findFirst({
            where: {
                accountId: authenticate?.id
            }
        });

        if(exist) {
            await prisma.accountToken.update({
                where: {
                    id: exist.id,
                },
                data: {
                    firebase: token,
                }
            })
        } else {
            await prisma.accountToken.create({
                data: {
                    id: generateUUID(),
                    firebase: token,
                    accountId: authenticate?.id,
                }
            });
        }
    } catch (error) {
        throw (error)
    }
}