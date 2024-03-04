const firebase = require('firebase-admin');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

firebase.initializeApp({
    credential: firebase.credential.cert(require('../../../../credential.json')),
});

exports.sendNotification = async ({ authenticate }) => {
    try {
        const res = await prisma.accountToken.findMany();

        const token = res[0];

        if(res){
            const message = {
                token: token.firebase.toString(),
                notification: {
                    title: 'Perubahan Data User',
                    body: `${authenticate.name} baru saja mengubah informasii`
                }
            }

            await firebase.messaging().send(message);
        }
    } catch (error) {
        console.log(error);
        throw(error)
    }
}