const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
         name : {type : 'string' , 
         required: [true , 'Please Enter Your Name'],
         maxLength : [30, 'Your Name Cannot Be More Than 30 Characters'],

     },
     email : {type : 'string',
     required: [true, 'Please Enter Your Email Address'],
     unique : true,
     validate : [validator.isEmail, 'Please Enter Valid Email Address']
     },
     passwords : {type : 'string' ,
    required: [true , 'Please Enter Your Passwords'],
    minLength : [6,'Your Passwords must be at least 6 characters'],
    select : false,

    },
    avatar : { 
        publicid : {
        type : 'string',
        required: [true]},

        url : { type : 'string' ,
                required : [true]
            
        },
    },

    role : {type : 'string' ,
            default : 'user'
    },

    createdAt : {type : Date ,
    default : Date.now},


    resetPasswordToken:String,
    resetPasswordExpires:Date



        
    
})
module.exports = mongoose.model('User',userSchema)