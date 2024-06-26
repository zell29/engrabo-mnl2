const express = require('express');
const { isAdmin, isAuthenticated } = require('../middleware/auth');
const router = express.Router();
const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../model/product');
const Admin = require('../model/admin');
const Order = require('../model/order');
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require('fs');
// Create Product
router.post(
  '/create-product',
  upload.array('images'),
  catchAsyncError(async (req, res, next) => {
    try {
      const adminId = req.body.adminId;
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return next(new ErrorHandler('Admin Id is invalid', 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const productData = req.body;
        productData.images = imageUrls;
        productData.admin = admin;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all Products
router.get(
  '/get-all-products-admin/:id',
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find({ adminId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all Products for all users
router.get(
  '/get-all-products',
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find({});
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete Product
router.delete(
  '/delete-admin-product/:id',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      console.log(product.images);

      if (!product) {
        return new new ErrorHandler('Product not found with this id!', 500)();
      }

      res.status(201).json({
        success: true,
        message: 'Product Deleted Successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Search products by name or other attributes
router.get(
  '/search-products',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const search = req.query.search;
      const regex = new RegExp(search, 'i'); // 'i' makes it case insensitive
      const products = await Product.find({
        $or: [
          { name: { $regex: regex } },
          { category: { $regex: regex } },
          // Add more fields if needed
        ],
      });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Review for a product
router.put(
  '/create-new-review',
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { 'cart.$[elem].isReviewed': true } },
        { arrayFilters: [{ 'elem._id': productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: 'Reviwed successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
