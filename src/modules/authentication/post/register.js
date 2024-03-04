const { PrismaClient } = require('@prisma/client')
const { hashPassword } = require('../../../utilities/bcrypt');
const { generateUUID } = require('../../../utilities/uuid');

const prisma = new PrismaClient();

exports.registerUser = async ({
    name,
    email,
    phone,
    password,
}) => {
    try {
        if (!name) throw ({
            status: 400,
            message: 'Name required!'
        });

        if (!email && !phone) throw ({
            status: 400,
            message: 'Fill up email or phone fields!'
        });

        const emailExist = await prisma.account.findUnique({
            where: {
              email: email,
            },
        });

        if (emailExist) throw ({
            status: 400,
            message: 'Email already used!'
        });

        if(phone){
            const phoneExist = await prisma.account.findUnique({
                where: {
                  phone: phone,
                },
            })

            if (phoneExist) throw ({
                status: 400,
                message: 'Phone already used!'
            });
        }

        const role = await prisma.role.findUnique({
            where: {
              name: 'staff',
            },
        })

        await prisma.account.create(
            { 
                data: {
                    id: generateUUID(),
                    email: email,
                    phone: phone ? phone : null,
                    password: hashPassword(password),
                    information: {
                        create: {
                            id: generateUUID(),
                            name,
                        }
                    },
                    roleId: role.id
                },
                include: {
                    information: true,
                }
            }
        )
    } catch (error) {
        throw (error)
    }
}