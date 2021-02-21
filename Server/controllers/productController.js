const Products = require('../models/products');



//Create NEW Product
exports.newProduct = async (req, res, next) => {
    const products = await Products.create(req.body);
    res.status(201).json({
        success: true,
        products: products
    })
}


//Getting ALl Products from the server      => /products/
exports.getProducts = async (req,res, next)=> {
    const products = await Products.find();
    res.status(201).json({
        success : true,
        count : products.length,
        products: products
    
    
    })
}

//Getting Products By ID and
exports.getSingleProduct = async (req, res, next)=> {
    const singleproduct = await Products.findById(req.params.id);

    if((!singleproduct)) {
       return res.status(404).json({
            success : false,
            message : 'product not found'
        })
    }
    res.status(200).json({
        success : true,
        singleproduct : singleproduct
    })
}
