const Products = require('../models/products');
const ErrorHandler = require('../utils/ErrorHandler')
const CatchAsyncERROR = require('../middlewares/catchAsyncErrors')
const SearchFilterApi = require('../utils/SearchFilterAPI')
Products.init()


//Create NEW Product
exports.newProduct = CatchAsyncERROR (
    async (req, res, next) => {
        const products = await Products.create(req.body);
           
        res.status(201).json({
            success: true,
            products: products
        })
    }
) 


//Getting ALl Products from the server      => /products/
exports.getProducts = CatchAsyncERROR ( async (req,res, next)=> {
    const searchfilter = new SearchFilterApi(Products.find(), req.query )
                            .searchFilterMethod() 
    
    const products = await searchfilter.query;
    if(!products) {
        return next(new ErrorHandler('Products Not Found', 404))
    }
    res.status(201).json({
        success : true,
        count : products.length,
        products: products
    
    
    })
}
)
//Getting Products By ID and
exports.getSingleProduct = CatchAsyncERROR ( async (req, res, next)=> {
    const singleproduct = await Products.findById(req.params.id);
   

    if((!singleproduct)) {
        return next(new ErrorHandler('Products Not Found', 404))
    }
    res.status(200).json({
        success : true,
        singleproduct : singleproduct
    })
}
)

//Updating Products 

exports.updateProduct = CatchAsyncERROR ( async (req, res, next)=> {
    let updateproduct = await Products.findById(req.params.id); 
    if((!updateproduct)) {
                return res.status(404).json({
                     success : false,
                     message : 'product not found'
        })
     }
    //  console.log(updateproduct)
     updateproduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
         new : true, //to avoid some warnings
         runValidators : true,
         useFindAndModify : false
     })
         res.status(200).json({
        success : true,
        message : "updated product sucessfully",
        updateproduct : updateproduct
    })
    // console.log(updateproduct)
     
}
)


exports.deleteProducts = CatchAsyncERROR ( async (req, res, next) => {
   let deleteproducts= await Products.findById(req.params.id)

   if(!deleteproducts) {
       return res.status(404).json({
        sucess: false,   
        message: "Product not found"})
   }
   await deleteproducts.remove()
   res.status(200).json({
       success: true,
       message: "Product deleted"
   })
}
)