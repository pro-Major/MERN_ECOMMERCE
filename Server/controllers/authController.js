const User = require('../models/user');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

//Register a User 
<<<<<<< HEAD
    exports.registerUser = CatchAsyncERROR ( async (req, res, next)=> {
    const { name,email,password} =req.body;
=======
exports.registerUser = catchAsyncErrors ( async (req, res, next)=> {
    const {name,email,password} =req.body;
>>>>>>> 711eb3762feb36942ff0bb168f0a413850d2c768

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
<<<<<<< HEAD
    exports.loginUser = CatchAsyncERROR (async (req,res,next)=> {
=======
exports.loginUser = catchAsyncErrors (async (req,res,next)=> {
>>>>>>> 711eb3762feb36942ff0bb168f0a413850d2c768
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