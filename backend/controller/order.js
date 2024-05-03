const express = require('express');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const { isAuthenticated } = require('../middleware/auth');
const Order = require('../model/order');
const Product = require('../model/product');

// create new order
router.post(
  '/create-order',
  catchAsyncError(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      // Group Cart Items by AdminID
      const adminItemsMap = new Map();

      for (const item of cart) {
        const adminId = item.shopId;
        if (!adminItemsMap.has(adminId)) {
          adminItemsMap.set(adminId, []);
        }
        adminItemsMap.get(adminId).push(item);
      }

      // Create an order
      const orders = [];

      for (const [adminId, items] of adminItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all orders of the user
router.get(
  '/get-all-orders/:userId',
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({ 'user._id': req.params.userId }).sort({
        createAt: -1,
      });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
