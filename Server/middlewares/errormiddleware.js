const ErrorHandler = require('../utils/ErrorHandler')
require('dotenv').config({path : 'Server/configuration/.env'});


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
  
    if(process.env.NODE_ENV ==='DEVELOPMENT') 
     { 
         
        res.status(err.statusCode).json({
            success: false,
            ErrorName : err.name,
            error : err,
            errmessage: err.message,
            stack : err.stack
            
        })       
    }
   
//Handling Production Errors 
    if(process.env.NODE_ENV === 'PRODUCTION'){
          let error = {...err}
          error.message = err.message

//Wrong Mongoose Object ID Error Handle   Message : Cast to ObjectId failed for value
        if(err.name == "CastError") {
            const message = `Resource not found . Invalid : ${err.path}`
            error = new ErrorHandler(message,400)
           
        }
//Handling Mongoose Validation Error
      if(err.name == 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message ,400)
    }

          res.status(error.statusCode).json({

            success: false,
            message: error.message || 'Internal Server Error'
        })     
    }
}