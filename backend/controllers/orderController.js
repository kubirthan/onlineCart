const catchAsyncError = require('../middlewares/catchAsyncError')
const Order = require('../models/orderModel')

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