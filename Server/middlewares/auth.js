const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

//Check if user is Authenticated or not...
exports.isAuthenticatedUser = catchAsyncErrors ( async (req, res, next )=> {
    const {token} = req.cookies 

    if(!token){
        return next(new ErrorHandler('Login First to Access this resource.',401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.User = await User.findById(decoded.id);

    next()
}) 
//Handling User Roles 
exports.authorizeRoles = (...roles) => {
    return (req ,res ,next) => {
        if(!roles.includes(req.User.role)){
            return next( new ErrorHandler (`Role (${req.User.role}) is not allowed to access this resource`,403) )

        }
        next()
    }
}