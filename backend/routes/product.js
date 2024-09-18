const express = require('express')
const { getProducts, newProduct, getSingleProduct, updateProduct } = require('../controllers/productController')
const router = express.Router()

router.route('/products').get(getProducts)
router.route('/product/new').post(newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/product/:id').put(updateProduct)

module.exports = router