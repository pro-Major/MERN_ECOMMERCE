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
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body 
    const order = await Order.create({
        orderItems ,
        shippingInfo,
        itemsPrice,
        taxPrice,
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

//Get ALl Order. Only Admin access 
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

//Update Process Order. Only Admin access 
exports.updateOrder = catchAsyncErrors(async(req,res,next)=> {
    const order = await Order.findById(req.params.id)

  if(order.orderStatus === 'Delivered'){
      return next(new ErrorHandler(`You have already delivered this order`,400))
  }
  order.orderItems.forEach(async item => {
      await updateStock(item.product, item.quantity)
  })

  order.orderStatus = req.body.orderStatus,
  order.deliveredAt = Date.now()

  await order.save()

    res.status(200).json({
        success : true,
    })
})
async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({validateBeforeSave:false})
}

//Delete A Order 
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=> {
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(`no Order Found with this ID`,404))
    }
    await order.remove()

    res.status(200).json({
        success :true,
        

    })
})