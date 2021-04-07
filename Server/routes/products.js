const express = require('express');
const router = express.Router();


//Product Controllers
const {getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
     deleteProducts,
     } = require('../controllers/productController')

const { isAuthenticatedUser } = require('../middlewares/auth');

//Posting Data in DataBase 
router.route('/newproduct')
.post(newProduct);



//Getting Single Product
//Getting Productsrouter.route('/:id)
router.route('/').get(isAuthenticatedUser,getProducts);


     

//Getting Single Product
router.route('/:id')
.get(isAuthenticatedUser,getSingleProduct)
.post(isAuthenticatedUser,updateProduct)
.delete(isAuthenticatedUser,deleteProducts)
module.exports= router;
