const express = require('express');
const router = express.Router();


//Product Controllers
const {getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
     deleteProducts,
     createProductReview,
     getProductReviews,
     deleteProductReview,
     getAdminProducts
     } = require('../controllers/productController')

const { isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth');

//Posting Data in DataBase 
router.route('/newproduct')
.post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);


//Get All Products 
router.route('/').get(getProducts);

router.route('/admin/products').get(getAdminProducts);




     

//Getting Single Product
router.route('/:id')
.get(getSingleProduct)
.put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProducts)

router.route('/review')
.put(isAuthenticatedUser, createProductReview)


router.route('/reviews/getreview')
.get(isAuthenticatedUser,getProductReviews)

router.route('/reviews/delete')
.delete(isAuthenticatedUser,deleteProductReview)


module.exports= router;
 