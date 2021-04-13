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