const express = require('express');
const router = express.Router();

const {newOrder, getSingleOrder, myOrders} = require('../controllers/orderController');

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')



router.route('/new')
.post(isAuthenticatedUser, newOrder)



router.route('/:id')
.get(isAuthenticatedUser,getSingleOrder)



router.route('/me')
.get(isAuthenticatedUser,myOrders)






module.exports = router;