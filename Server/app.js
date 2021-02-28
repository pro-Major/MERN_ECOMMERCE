const express = require('express')
const app = express();
const ErrorMiddleware = require('./middlewares/errormiddleware')
//JSON 
app.use(express.json());
//Importing All Routes 
const products = require('./routes/products')
const auth = require('./routes/auth')

app.use('/products',products)
app.use('/auth',auth)

//Middleware for handline Errors
app.use(ErrorMiddleware)


module.exports = app