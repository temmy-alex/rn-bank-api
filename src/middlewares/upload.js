const multer = require("multer");
var fs = require('fs');
const {
    v4: uuidv4
} = require('uuid');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file){
            const folder = `./public/${file.fieldname}`

            if (folder) {
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, {
                        recursive: true
                    });
                }
                cb(null, folder)
            } else {
                cb(null, null)
            }
        } else {
            cb(null, null)
        }
    },
    filename: function (req, file, cb) {
        let uuid = uuidv4();

        if (req) {
            let fileArr = file.originalname.split('.');
            let fileExt = fileArr[fileArr.length - 1];

            cb(null, `${uuid}-${Date.now()}.${fileExt.toLowerCase()}`)
        } else {
            cb(null, null)
        }
    }
})

const uploadImage = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1]
    const extname = filetypes.test(extension)
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        throw({
            status: 400,
            message: 'Image Only'
        })
    }
}

module.exports = { uploadImage }