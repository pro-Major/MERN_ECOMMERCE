const express = require('express');
const router = express.Router();

const { registerUser , loginUser} = require('../controllers/authController');


router.route('/registeruser',)
.post(registerUser);

router.route('/loginUser',)
.post(loginUser)

module.exports = router;