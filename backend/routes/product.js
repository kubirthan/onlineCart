const express = require('express')
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const router = express.Router()
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate')
const { createReview, getReviews, deleteReview } = require('../controllers/orderController')

router.route('/products').get(getProducts)
router.route('/product/:id').get(getSingleProduct)
router.route('/product/:id').put(updateProduct)
router.route('/product/:id').delete(deleteProduct)
router.route('/review').put(isAuthenticatedUser, createReview)
router.route('/reviews').get(getReviews)
router.route('/review').delete(deleteReview)

//admin
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct)

module.exports = router