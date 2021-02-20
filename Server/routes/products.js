const express = require('express');
const router = express.Router();


//Product Controllers
const {getProducts} = require('../controllers/productController')


router.route('/')
.get(getProducts);

module.exports= router;