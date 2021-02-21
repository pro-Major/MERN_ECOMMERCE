const Products = require('../models/products');



//Create NEW Product
exports.newProduct = async (req, res, next) => {
    const products = await Products.create(req.body);
    res.status(201).json({
        success: true,
        products: products
    })
}



exports.getProducts = (req,res, next)=> {
    res.status(200).json({
        success : true,
        message : 'This route will show products in database.'
    })
}
