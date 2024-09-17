const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter product name"],
        maxLength: [100, "Product name cannot exceed 10 characters"],
        trim: true
    },
    price : {
        type: Number,
        default : 0.0
    },
    description : {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type : String,
        default : 0
    },
    images : [
        {
            filename : {
                type: String,
                required: true
            }
        }
    ],
    category : {
        type :String,
        required: [true, "Please enter product category"],
        enum : {
            values : [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'headphones',
                'Food',
                'Books',
                'Clothes/Health',
                'Beauty/health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: "Please enter correct category"
        }
    },
    seller : {
        type :String,
        required: [true, "Please enter product seller"]
    },
    stock : {
        type : Number,
        required: [true, "Please enter product stock"],
        maxLength: [20, "Product stock cannot exceed 20 "]
    },
    numOfReviews: {
        type : Number,
        default : 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const schema = mongoose.model('Product', productSchema)

module.exports = schema