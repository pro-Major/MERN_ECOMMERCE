const user = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

//Check if user is Authenticated or not...
exports.isAuthenticatedUser = catchAsyncErrors ( async (req, res, next )=> {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler('Login First to Access this resource. ',401))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
}) 