const express = require('express')
const router = express.Router()
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate')
const { newOrder, getSingleOrder, myOrders, orders } = require('../controllers/orderController')


router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder)
router.route('/myorders').get(isAuthenticatedUser, myOrders)


//admin routes
router.route('/orders').get(isAuthenticatedUser,authorizeRoles('admin'), orders)
module.exports = router