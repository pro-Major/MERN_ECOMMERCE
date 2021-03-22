const User = require('../models/user');

const ErrorHandler = require('../utils/ErrorHandler');
const CatchAsyncERROR = require('../middlewares/catchAsyncErrors');

//Register a User 
exports.registerUser = CatchAsyncERROR ( async (req, res, next)=> {
    const { name,email,password} =req.body;

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
exports.loginUser = CatchAsyncERROR (async (req,res,next)=> {
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
    
})