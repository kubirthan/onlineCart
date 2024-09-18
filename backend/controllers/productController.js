const Product = require('../models/productModel')


//Get all products - /api/v1/products
exports.getProducts = async(req, res, next) => {
    const products = await Product.find()
    let count = products.length

    res.status(200).json({
        success: true,
        count, 
        products
    })
}


//create new product - /api/v1/product/new
exports.newProduct = async(req, res, next) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        success: true,
        product
    })
}