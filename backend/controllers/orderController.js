const catchAsyncError = require('../middlewares/catchAsyncError')
const Order = require('../models/orderModel')
const ErrorHandler = require('../utils/errorHandler')

//create new order - /api/v1/order/new
exports.newOrder = catchAsyncError(async(req, res, next) => {
    const {
        
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentinfo

    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentinfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        order
    })
})

//Get single order - /api/v1/:id
exports.getSingleOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        return next(new ErrorHandler(`Order is not found with this id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        order
    })
})