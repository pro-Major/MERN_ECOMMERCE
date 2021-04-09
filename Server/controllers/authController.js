const User = require('../models/user');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')

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
        httpOnly : true,
    })
    res.status(200).json({
        success : true,
        message : 'Logged Out'
    })
})

//Forgot Password  ==>   /
exports.forgotPassword = catchAsyncErrors(async (req,res,next)=> {
    const user = await User.findOne({email : req.body.email});

    if(!user) { 
        return next (new ErrorHandler('Invalid Email or Password',404));
    }
    //Get Reset Token 
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave : false})

    //Creating reset Password URL 
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your Password reset token is as Follow: \n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`

    try {
            await sendEmail({ 
                email : user.email,
                subject: `Reset You Ecommerce Password`,
                message
            })
            res.status(200).json({
                success : true,
                message : `Email sent to: ${user.email}`
            })
     }
    catch(error) {
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;  
        
        await user.save({ validateBeforeSave : false })};

        return next(new ErrorHandler(error.message, 500))
})