const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.uploadData = async ({
    filename,
    size,
    path,
    fileType,
    authenticate,
}) => {
    try {
        const mimetype = fileType.split('/')[0];

        await prisma.attachment.create({
            data: {
                name: filename,
                size,
                attachmentType: mimetype === 'image' ? 'Photo': 'Document',
                attachmentOwner: 'User',
                url: path,
                type: fileType,
                accountId: authenticate?.id
            }
        })
    } catch (error) {
        throw (error)
    }
}