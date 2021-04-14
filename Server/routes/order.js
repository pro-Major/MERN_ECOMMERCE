const express = require('express');
const router = express.Router();

const {newOrder, getSingleOrder, myOrders, allOrders , updateOrder} = require('../controllers/orderController');

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')



router.route('/new')
.post(isAuthenticatedUser, newOrder)



router.route('/select/:id')
.get(isAuthenticatedUser,getSingleOrder)



router.route('/me')
.get(isAuthenticatedUser,myOrders);


router.route('/admin/orders')
.get(isAuthenticatedUser,authorizeRoles('admin'),allOrders);


router.route('/admin/order/:id')
.put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
module.exports = router;