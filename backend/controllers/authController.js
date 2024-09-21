const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../models/userModel')


exports.registerUser = catchAsyncError(async(req, res, next) => {
    const {name, email, password, avatar} = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar
    })

    const token = user.getJwtToken()

    res.status(201).json({
        success: true,
        user,
        token
    })
})