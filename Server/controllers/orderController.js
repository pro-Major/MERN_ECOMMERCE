const Order = require('../models/order');
const Product = require('../models/products');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


//Create a New Order 
exports.newOrder = catchAsyncErrors(async(req,res,next)=> {
    const {
        orderItems ,
        shippingInfo,
        itemsPrice,
        GST,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body 
    const order = await Order.create({
        orderItems ,
        shippingInfo,
        itemsPrice,
        GST,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt : Date.now(),
        user : req.User._id
    })
    res.status(200).json({
        success : true,
        order
    })
})
//Get Single Order 
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=> {
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler(`No Order Found with this ID`,404));
    }
    res.status(200).json({
        success : true,
        order
    })
})


//Get Logged in User Orders
exports.myOrders = catchAsyncErrors(async(req,res,next)=> {
    const orders = await Order.find({user: req.User.id})
   
    
    res.status(200).json({
        success : true,
        orders
    })
})

//Get ALl Order. Only Admin can see 
exports.allOrders = catchAsyncErrors(async(req,res,next)=> {
    const orders = await Order.find()



    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success : true,
        totalAmount,
        orders
    })
})