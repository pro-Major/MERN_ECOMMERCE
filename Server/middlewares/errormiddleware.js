const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
<<<<<<< HEAD
    if(process.env.NODE_ENV === 'DEVELOPMENT') {
=======


    if(err.name = "CastError") {
        const message = `Resource not found . Invalid : ${err.path}`
            error = new ErrorHandler(message,400)
    }

    if(process.env.NODE_ENV == 'DEVELOPMENT') {
>>>>>>> 1ac3cf14481b431162978a5017737124c4aea48d
        res.status(err.statusCode).json({
            success: false,
            ErrorName : err.name,
            error : err,
            errmessage: err.message,
            stack : err.stack,
            
        })       
    }
<<<<<<< HEAD
    if(process.env.NODE_ENV === 'PRODUCTION'){
=======

    if(process.env.NODE_ENV == 'PRODUCTION'){
>>>>>>> 1ac3cf14481b431162978a5017737124c4aea48d
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