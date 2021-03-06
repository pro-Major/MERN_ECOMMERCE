const User = require('../models/user');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const user = require('../models/user');

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



//Update / change Password 
exports.updatePassword  = catchAsyncErrors (async (req,res,next)=> {
    const user = await User.findById(req.User.id).select('+password');
    //Checking previous user password 
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler(`Old Password is Incorrect`));
    }
    user.password = req.body.password;

    await user.save();

    sendToken(user,200,res)
})
//Update User Profile 
exports.updateProfile = catchAsyncErrors (async ( req, res, next)=> {
    const newUserData = { 
        name : req.body.name,
        email: req.body.email
    }
        //Update Avatar: TODO 
        const user = await User.findByIdAndUpdate(req.User.id, newUserData, {
            new : true,
            runValidators: true,
            useFindAndModify : false
        })

        res.status(200).json({
            success : true
        })
    }
)




//Logout A User 
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
        return next (new ErrorHandler('User Not Found!',404));
    }
    //Get Reset Token 
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave : false})

    //Creating reset Password URL 
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Your Password reset token is as Follow: \n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`
    try {
            await sendEmail({ 
                email : user.email,
                subject: `Reset You Ecommerce Password`,
                message
                
            })
           
            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email}`
            })
     }
    catch (error) { 
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;  
        
        await user.save({ validateBeforeSave : false })};

        return next(new ErrorHandler(error.name, 500))
})

//Reset A Password => /password/reset/
exports.resetPassword = catchAsyncErrors(async (req,res,next)=> {
    //Hash Url token 
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : { $gt :Date.now()}
    })
    if(!user) {
        return next ( new ErrorHandler (`Password reset token is invalid or expired`, 400))
    }
    if(req.body.password !== req.body.confirmpassword) {
        return next(new ErrorHandler (`Password does not match`,400))
    }
    //setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();  

    sendToken(user,200,res)
        
})

//Get currently logged in user details
exports.getUserProfile = catchAsyncErrors (async (req, res,next)=> {
    const user = await User.findById(req.User.id);
    res.status(200).json({
        success : true,
        user

    })
})

//ADMIN ROUTES 

//Get All Users 
exports.allUsers = catchAsyncErrors (async (req,res,next)=> {
    const users = await User.find();

    res.status(200).json({
        success : true,
        users
    })
})

//Get a User details 

exports.getUserDetails = catchAsyncErrors ( async (req,res,next)=> {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with ${req.params.id}`))
    }
    res.status(200).json({
        success : true,
        user
    })
})



  //Update User Profile. Admin Access API only 
exports.updateUser = catchAsyncErrors (async ( req, res, next)=> {
    const newUserData = { 
        name : req.body.name,
        email: req.body.email,
        role : req.body.role
    }
        //Update Avatar: TODO 
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new : true,
            runValidators: true,
            useFindAndModify : false
        })

        res.status(200).json({ 
            success : true,
            user
        })
    }
)

//Delete a User.Admin Access API only 
exports.userDelete = catchAsyncErrors(async (req,res,next)=> {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    await user.remove();

    res.status(200).json({
        success : true,
    })
})

