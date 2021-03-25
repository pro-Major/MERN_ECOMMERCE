const User = require('../models/user');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

//Register a User 
exports.registerUser = catchAsyncErrors ( async (req, res, next)=> {
    const {name,email,password} =req.body;

    const user = await User.create({
        name,
        email,
        password
        
    })
    
    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    });
   
})

//Login a User
exports.loginUser = catchAsyncErrors (async (req,res,next)=> {
    const {email,password} = req.body;

    //checking if email and password entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please Enter email and Password',400))
    }
    //Finding User in Database 
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('invalid Email or Password',401));
    }
    //Checks If a Password is correct or not 
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('invalid Email or Password',401));
    }
    sendToken(user,200,res)
    // const token = user.getJwtToken();
    // res.status(200).json({
    //     success : true,
    //     token
    // })
})
exports.logout = catchAsyncErrors ( async (req, res, next)=> {
    res.cookie('token',null, { 
        expires : new Date(Date.now()),
        httponly : true,
    })
    res.status(200).json({
        sucess : true,
        message : 'Logged Out'
    })
})