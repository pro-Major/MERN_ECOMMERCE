const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';


    if(err.name = "CastError") {
        const message = `Resource not found . Invalid : ${err.path}`
            error = new ErrorHandler(message,400)
    }

    if(process.env.NODE_ENV == 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            ErrorName : err.name,
            error : err,
            errmessage: err.message,
            stack : err.stack,
            
        })       
    }

    if(process.env.NODE_ENV == 'PRODUCTION'){
          let error = {...err}
          error.message = err.message

        //Wrong Mongoose Object ID Error Handle   Message : Cast to ObjectId failed for value
        if(err.name == 'CastError') {
            const message = `Resource not found . Invalid : ${err.path}`
            error = new ErrorHandler(message,400)
        }




        res.status(error.statusCode).json({
            success: false,
            message: err.message || 'Internal Server Error'
        })
    }
}