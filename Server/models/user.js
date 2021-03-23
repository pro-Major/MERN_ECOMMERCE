const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
         name : {type : String , 
         required: [true , 'Please Enter Your Name'],
         maxlength : [30, 'Your Name Cannot Be More Than 30 Characters'],

     },
     email : {type : String,
     required: [true, 'Please Enter Your Email Address'],
     unique : true,
     validate : [validator.isEmail, 'Please Enter Valid Email Address']
     },
     password : {type : String ,
    required: [true , 'Please Enter Your Password'],
    minlength : [6,'Your Password must be at least 6 characters'],
    select : false,

    },
    //Thought of adding images but not did it.
    // avatar : { 
    //     publicid : {
    //     type : String,
    //     required: [true]},

    //     url : { type : String ,
    //             required : [true]
            
    //     },
    // },

    role : {type : String ,
            default : 'user'
    },

    createdAt : {type : Date ,
    default : Date.now},


    resetPasswordToken:String,
    resetPasswordExpire:Date

        
        
    
})
//Encrypting the password before asving user
userSchema.pre('save', async function (next) {
       if(!this.isModified('password')) {
           next();
       }     
       this.password = await bcrypt.hash(this.password , 10)
}) 
//Compare User Password 
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}
//Return JWT token
userSchema.methods.getJwtToken =  function() {
    return jwt.sign({id :  this._id}, process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRES_TIME 
});
}







module.exports = mongoose.model('User',userSchema)