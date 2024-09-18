const Product = require('../models/productModel')

exports.getProducts = (req, res) => {
    res.status(200).json({
        success: true,
        message : "This route will show all the products"
    })
}

exports.newProduct = async(req, res, next) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        success: true,
        product
    })
}