const statusMessages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    500: 'Internal Server Error'
  };

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || statusMessages[statusCode] || 'Some unknown error occured';
    console.error(err.stack);
    res.status(statusCode).json({message: message});
}

module.exports = errorHandler;