const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
         name : {type : 'string' , 
         required: [true , 'Please Enter Your Name'],
         maxlength : [30, 'Your Name Cannot Be More Than 30 Characters'],

     },
     email : {type : 'string',
     required: [true, 'Please Enter Your Email Address'],
     unique : true,
     validate : [validator.isEmail, 'Please Enter Valid Email Address']
     },
     password : {type : 'string' ,
    required: [true , 'Please Enter Your Password'],
    minlength : [6,'Your Password must be at least 6 characters'],
    select : false,

    },
    //Thoght of adding images but not did it.
    // avatar : { 
    //     publicid : {
    //     type : 'string',
    //     required: [true]},

    //     url : { type : 'string' ,
    //             required : [true]
            
    //     },
    // },

    role : {type : 'string' ,
            default : 'user'
    },

    createdAt : {type : Date ,
    default : Date.now},


    resetPasswordToken:String,
    resetPasswordExpires:Date

        
        
    
})
//Encrypting the password before asving user
userSchema.pre('save', async function (next) {
       if(!this.isModified('password')) {
           next();
       }     
       this.password = await bcrypt.hash(this.password , 10)
}) 

//Return JWT token
userSchema.methods.getJwtToken =  function() {
    return jwt.sign({id :  this._id}, process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRES_TIME 
});
}







module.exports = mongoose.model('User',userSchema)