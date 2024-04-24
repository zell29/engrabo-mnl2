const express = require('express');
const catchAsyncError = require('../middleware/catchAsyncError');
const Admin = require('../model/admin');
const ErrorHandler = require('../utils/ErrorHandler');
const { isAdmin } = require('../middleware/auth');
const CouponCode = require('../model/couponCode');
const router = express.Router();

// create coupoun code
router.post(
  '/create-coupon-code',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CouponCode.find({
        name: req.body.name,
      });

      if (isCouponCodeExists.length !== 0) {
        return next(new ErrorHandler('Coupoun code already exists!', 400));
      }

      const couponCode = await CouponCode.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons of a shop
router.get(
  '/get-coupon/:id',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({ adminId: req.params.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  '/delete-coupon/:id',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: 'Coupon code deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  '/get-coupon-value/:name',
  catchAsyncError(async (req, res, next) => {
    try {
      const regex = new RegExp(req.params.name, 'i'); // 'i' makes it case insensitive
      const couponCode = await CouponCode.find({ name: { $regex: regex } });

      res.status(200).json({
        success: true,
        couponCodes: couponCode, // Consider returning an array since it's a search
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
