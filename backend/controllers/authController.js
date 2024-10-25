const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../models/userModel')
const sendEmail = require('../utils/email')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwt')
const crypto = require('crypto')


exports.registerUser = catchAsyncError(async(req, res, next) => {
    const {name, email, password} = req.body

    let avatar
    if(req.file){
        avatar =  `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
    }
    const user = await User.create({
        name,
        email,
        password,
        avatar
    })

    sendToken(user, 201, res)
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password){
        return next(new ErrorHandler('Please enter email or password', 400))
    }

    //finding the user database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
})

exports.logoutUser = (req, res, next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "Loggedout"
    })
}

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    if(!user) {
        return next(new ErrorHandler('user not found with this email', 404))
    }

   const resetToken =  user.getResetToken()
   await user.save({validateBeforeSave: false})

   //create reset url
   const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

   const message = `Your password reset url is as follows \n\n
   ${resetUrl} \n\n If you have not requested this email, then ingnore it`

   try {
        sendEmail({
            email: user.email,
            subject: "onlineCart password recovery",
            message
        })

        res.status(200).res({
            success:true,
            message: `Email sent to ${user.email}`
        })
    
   } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpire = undefined
        await user.save({validateBeforeSave: false})
        return next(new ErrorHandler(error.message), 500)
   }
})

exports.resetPassword = catchAsyncError( async(req, res, next) => {
   const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex')

   const user = User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
        $gt: Date.now()
    }
   })

   if(!user){
    return next(new ErrorHandler('Password token is invalid or expired'))
   }

   if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler('Password does not match'))
   }

   user.password = req.body.password
   user.resetPasswordToken = undefined
   user.resetPasswordTokenExpire = undefined
   await user.save({validateBeforeSave: false})

   sendToken(user, 201, res)
}
)

//Get User Profile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
   const user = await  User.findById(req.user.id)
   res.status(200).json({
    success: true,
    user
   })
})

//change password
exports.changePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    //check old password
    if(!user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('old password is incorrect', 401))
    }

    //assigning new password
    user.password = req.body.password
    await user.save()

    res.status(200).json({
        success: true
    })
})

//Update profile
exports.updateProfile = catchAsyncError(async (req, res, next)=> {
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    let avatar
    if(req.file){
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
        newUserData = {...newUserData, avatar}
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
            new: true,
            runValidators: true
        }
    )

    res.status(200).json({
        success: true,
        user
    })
})

//admin: Get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

//admin: get specific user
exports.getSpecificUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User not found with this id:${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
})

//Admin: update user
exports.updateUser = catchAsyncError(async (req, res, next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Admin: delete user
exports.deleteUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler('user not found', 401))
    }

    await user.deleteOne()

    res.status(200).json({
        success: true
    })
})