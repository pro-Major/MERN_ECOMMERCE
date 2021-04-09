const express = require('express');
const router = express.Router();


//Product Controllers
const {getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
     deleteProducts,
     } = require('../controllers/productController')

const { isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth');

//Posting Data in DataBase 
router.route('/newproduct')
.post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);


//Get All Products 
router.route('/').get(isAuthenticatedUser,authorizeRoles('admin'),getProducts);


     

//Getting Single Product
router.route('/:id')
.get(isAuthenticatedUser,getSingleProduct)
.post(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProducts)
module.exports= router;
