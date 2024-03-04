const { uploadData } = require("./post/upload");

class UploadApiController {
    static async upload(req, res, next) {
        try {
            await uploadData({
                filename: req.files[0].filename,
                fileType: req.files[0].mimetype,
                path: req.files[0].path,
                size: req.files[0].size,
                authenticate: req.authenticate
            })

            res.status(200).json({
                success: true,
                message: 'Success upload',
                data: {
                    path: req.files[0].path,
                }
            })
        } catch (error) {
            console.log(error);
            next({
                error
            })
        }
    }
}

module.exports = UploadApiController;