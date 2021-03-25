const express = require('express');
const router = express.Router();

const { registerUser , loginUser, logout} = require('../controllers/authController');


router.route('/registeruser',)
.post(registerUser);

router.route('/loginUser',)
.post(loginUser);


router.route('/logout')
.get(logout);



module.exports = router;