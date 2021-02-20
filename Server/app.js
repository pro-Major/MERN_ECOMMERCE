const express = require('express')
const app = express();
//JSON 
app.use(express.json());
//Importing All Routes 
const products = require('./routes/products')

app.use('/products',products)




module.exports = app