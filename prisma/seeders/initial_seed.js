const { PrismaClient } = require('@prisma/client')
const { generateUUID } = require('../../src/utilities/uuid')
const { hashPassword } = require('../../src/utilities/bcrypt')
const prisma = new PrismaClient()

async function main() {
    const roleUserId = generateUUID();
    const roleAdminId = generateUUID();

    await prisma.accountAttendance.deleteMany({});
    await prisma.accountInformation.deleteMany({});
    await prisma.attachment.deleteMany({});
    await prisma.accountToken.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.role.deleteMany({});

    await prisma.role.upsert({
        where: {
            name: 'admin'
        },
        update: {},
        create: {
            id: roleAdminId,
            name: 'admin',
        },
    })

    await prisma.role.upsert({
        where: {
            name: 'staff'
        },
        update: {},
        create: {
            id: roleUserId,
            name: 'staff',
        },
    })

    await prisma.account.upsert({
        where: { email: 'temmy@alex.io' },
        update: {},
        create: {
            id: generateUUID(),
            email: 'temmy@alex.io',
            password: hashPassword('password'),
            roleId: roleUserId,
            information: {
                create: {
                    id: generateUUID(),
                    name: 'Temmy Alex',
                    gender: 'Male',
                    position: 'Senior Fullstack Developer'
                },
            }
        },
    })

    await prisma.account.upsert({
        where: { email: 'alex@alex.io' },
        update: {},
        create: {
            id: generateUUID(),
            email: 'alex@alex.io',
            password: hashPassword('password'),
            roleId: roleAdminId,
            information: {
                create: {
                    id: generateUUID(),
                    name: 'Temmy Alex',
                    gender: 'Male',
                    position: 'Senior Fullstack Developer'
                },
            }
        },
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })