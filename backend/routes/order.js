const express = require('express')
const router = express.Router()
const {isAuthenticatedUser} = require('../middlewares/authenticate')
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderController')


router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder)
router.route('/myorders').get(isAuthenticatedUser, myOrders)

module.exports = router