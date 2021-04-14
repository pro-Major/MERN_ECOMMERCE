const express = require('express');
const router = express.Router();

const {newOrder, getSingleOrder, myOrders, allOrders} = require('../controllers/orderController');

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')



router.route('/new')
.post(isAuthenticatedUser, newOrder)



router.route('/select/:id')
.get(isAuthenticatedUser,getSingleOrder)



router.route('/me')
.get(isAuthenticatedUser,myOrders);


router.route('/all')
.get(isAuthenticatedUser,authorizeRoles('admin'),allOrders);



module.exports = router;