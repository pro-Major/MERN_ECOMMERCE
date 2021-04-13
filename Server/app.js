const express = require('express')
const app = express();
const ErrorMiddleware = require('./middlewares/errormiddleware');
const cookieParser = require('cookie-parser');
//JSON 
app.use(express.json());
app.use(cookieParser());
//Importing All Routes 
const products = require('./routes/products');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/products',products)
app.use('/auth',auth)
app.use('/orders',order)
//Middleware to handle Errors
app.use(ErrorMiddleware)


module.exports = app