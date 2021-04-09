const express = require('express');
const router = express.Router();

const { registerUser , loginUser, logout , forgotPassword } = require('../controllers/authController');


router.route('/registeruser',)
.post(registerUser);

router.route('/loginUser',)
.post(loginUser);


router.route('/logout')
.get(logout);

router.route('/password/forgot')
.post(forgotPassword)


module.exports = router;