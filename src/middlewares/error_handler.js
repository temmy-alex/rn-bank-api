module.exports = function (err, req, res, next) {
    const { error } = err;
    
    let statusCode = 500;
    let errorMessage = [];
    
    switch (err.name) {
        case "ValidationError":
            statusCode = 400;
            errorMessage.push(error.details[0].message.replace(/"/g, ''));
            break;
        case "MulterError":
            statusCode = 400;
            errorMessage.push(err.message);
            break;
        case "JsonWebTokenError":
            statusCode = 401;
            errorMessage.push('Token invalid');
            break;
        default:
            let message = error.message || 'Internal Server Error';
            errorMessage.push(message);
            statusCode = error.status || statusCode
            break;
    }

    res.status(statusCode).json({
        success: false,
        message: errorMessage.toString()
    });
}