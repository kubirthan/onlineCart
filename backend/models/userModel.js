const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email:{
        type: String,
        required:[true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required:[true, 'Please enter password'],
        maxLength: [6, 'Password cannot exceed 6 characters']
    },
    avatar: {
        type:String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken : String,
    resetPasswordTokenExpire : Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next){
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function (){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

let model = mongoose.model('User',userSchema)

module.exports = model

