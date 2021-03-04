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

    res.status(200).json({
        success: true,
        token
    });
    res.status(500).json({
        sucess: false,
        message : "Error " 
    })
})