const express = require('express');
const router = express.Router();


//Product Controllers
const {getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
     deleteProducts,
     } = require('../controllers/productController')


//Posting Data in DataBase 
router.route('/newproduct')
.post(newProduct);



//Getting Single Product
//Getting Productsrouter.route('/:id)
router.route('/')
.get(getProducts);




//Getting Single Product
router.route('/:id')
.get(getSingleProduct)
.post(updateProduct)
.delete(deleteProducts)
module.exports= router;
