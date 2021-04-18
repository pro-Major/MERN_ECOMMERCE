const Products = require('../models/products');
const ErrorHandler = require('../utils/ErrorHandler')
const CatchAsyncERROR = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// const User = require('../models/user');
Products.init() 


//Create NEW Product
exports.newProduct = CatchAsyncERROR (
    async (req, res, next) => {
        req.body.user = req.User.id;
        const products = await Products.create(req.body);
           
        res.status(201).json({
            success: true,
            products: products
        })
    }
);



//Getting ALl Products from the server      => /products/:id

//getting listed  products from search => /products?keyword=apple.
exports.getProducts = CatchAsyncERROR ( async (req,res, next)=> {
    const resPerPage = 8;
    const productsCount = await Products.countDocuments();
    const apiFeatures = new APIFeatures(Products.find(), req.query)
        .search() 
        .pagination(resPerPage)
    
    const products = await apiFeatures.query;
    
    if(!products) {
        return next(new ErrorHandler('Products Not Found', 404))
    }
    setTimeout(()=> {
        res.status(200).json({
            success : true,
            productsCount,
            products
        })
    },0888)
   
});

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
});


//Updating Products 

exports.updateProduct = CatchAsyncERROR ( async (req, res, next)=> {
    let updateproduct = await Products.findById(req.params.id); 
    if((!updateproduct)) {
                return res.status(404).json({
                     success : false,
                     message : 'product not found'
        })
     }

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
     
});


//Delete A Product 
exports.deleteProducts = CatchAsyncERROR ( async (req, res, next) => {
   let deleteproducts= await Products.findById(req.params.id)

   if(!deleteproducts) {
       return res.status(404).json({
        success: false,   
        message: "Product not found"})
   }
   await deleteproducts.remove()
   res.status(200).json({
       success: true,
       message: "Product deleted"
   })
});

//Create A review API 

exports.createProductReview = catchAsyncErrors(async (req,res,next)=> {

    const {rating, comment , productId } = req.body;
    const review = {
        user : req.User._id,
        name : req.User.name,
        rating: Number(rating),
        comment
    }
    const product = await Products.findById(productId);
    const isReviewed = product.reviews.find( //finding review
    r => r.user.toString() === req.User._id.toString()
    )
    if(isReviewed){ 
            product.reviews.forEach(review => {
                if(review.user.toString() === req.user._id.toString()) { //updating found Review 
                    review.comment = comment; 
                    review.rating = rating;
                }
            })
    }else {
        product.reviews.push(review); //pushing review
        product.numOfReviews = product.reviews.length
    }
    product.ratings = product.reviews.reduce((acc,item)=> item.rating + acc, 0) / product.reviews.length


    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success : true
    })
})

//Get Product Reviews 
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=> {
    const product = await Products.findById(req.query.id);

    res.status(200).json({
        success : true,
        reviews : product.reviews 
    })
})

//Delete Product Review

exports.deleteProductReview = catchAsyncErrors(async(req,res,next)=> {
    const product = await Products.findById(req.query.productid);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

   const ratings =  product.reviews.reduce((acc,item)=> item.rating + acc, 0) / reviews.length

    await Products.findByIdAndUpdate(req.query.productid,
        {   reviews,
            ratings,
            numOfReviews},
            {
            new : true,
            runValidators: true,
            useFindAndModify : false}
        )
   res.status(200).json({
       success : true,
       message : "Deleted Successfully",
       
   })

})