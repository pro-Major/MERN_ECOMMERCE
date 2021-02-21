const express = require('express');
const router = express.Router();


//Product Controllers
const {getProducts,newProduct} = require('../controllers/productController')


//Posting Data in DataBase 
router.route('/newproduct')
.post(newProduct);




//Getting Products
router.route('/')
.get(getProducts);





module.exports= router;