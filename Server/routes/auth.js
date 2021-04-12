const express = require('express');
const router = express.Router();

const { registerUser ,
        loginUser,
        logout ,
        forgotPassword ,
        resetPassword ,
        getUserProfile,
        updatePassword,
        updateProfile,
        allUsers,
        getUserDetails} = require('../controllers/authController');

const { isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth');
const { update } = require('../models/user');

router.route('/registeruser',)
.post(registerUser);

router.route('/loginUser',)
.post(loginUser);


router.route('/logout')
.get(logout);

router.route('/password/forgot')
.post(forgotPassword)

router.route('/password/reset/:token')
.put(resetPassword);

router.route('/me')
.get(isAuthenticatedUser,getUserProfile);

router.route('/password/update')
.put(isAuthenticatedUser,updatePassword);

router.route('/me/update')
.put(isAuthenticatedUser , updateProfile )

router.route('/admin/users')
.get(isAuthenticatedUser, authorizeRoles('admin'),allUsers)

router.route('/admin/user/:id')
.get(isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)

module.exports = router;