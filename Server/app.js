const express = require('express')
const app = express();
const dotenv = require('dotenv');
const ErrorMiddleware = require('./middlewares/errormiddleware');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));

//Setting Up Config files 
dotenv.config({path : 'Server/configuration/.env'})

// //Seting Up Cloudinary 
// cloudinary.config({
//     cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
//     api_key : process.env.CLOUDINARY_API_KEY,
//     api_secret : process.env.CLOUDINARY_API_SECRET
// })
//Importing All Routes 
const products = require('./routes/products');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');
app.use('/products',products)
app.use('/auth',auth)
app.use('/orders',order)
app.use('/api/v1',payment)
//Middleware to handle Errors
app.use(ErrorMiddleware)


module.exports = app