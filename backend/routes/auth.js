const express = require('express')
const { registerUser,
     loginUser, 
     logoutUser, 
     forgotPassword, 
     resetPassword, 
     getUserProfile, 
     changePassword,
     updateProfile
    } = require('../controllers/authController')
const router = express.Router()
const {isAuthenticatedUser} = require('../middlewares/authenticate')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile)
router.route('/password/change').put(isAuthenticatedUser, changePassword)
router.route('/update').put(isAuthenticatedUser, updateProfile)

module.exports = router