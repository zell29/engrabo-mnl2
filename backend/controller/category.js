const express = require('express');
const { isAdmin } = require('../middleware/auth');
const catchAsyncError = require('../middleware/catchAsyncError');
const Category = require('../model/category'); // Ensure you have this model set up similarly to your Product model
const ErrorHandler = require('../utils/ErrorHandler');
const { upload } = require('../multer'); // Make sure your multer config can handle single file uploads
const router = express.Router();
const Admin = require('../model/admin');
const fs = require('fs');

// Create Category
router.post(
  '/create-category',
  upload.single('image'),
  catchAsyncError(async (req, res, next) => {
    try {
      const adminId = req.body.adminId;
      console.log(adminId);
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return next(new ErrorHandler('Admin Id is invalid', 400));
      } else {
        const { title } = req.body;
        const image_Url = req.file ? req.file.filename : null;
        const categoriesData = req.body;
        categoriesData.image_Url = image_Url;
        categoriesData.admin = admin;

        const category = await Category.create(categoriesData);

        res.status(201).json({
          success: true,
          category,
        });
      }
    } catch (error) {
      console.error('Create Category Error:', error);
      return next(new ErrorHandler('Failed to create category', 500));
    }
  })
);

// Get All Categories
router.get(
  '/categories',
  catchAsyncError(async (req, res, next) => {
    const categories = await Category.find({});
    res.status(200).json({
      success: true,
      categories,
    });
  })
);

// Update Category
router.put(
  '/update-category/:id',
  isAdmin,
  upload.single('image'), // Handling single image update
  catchAsyncError(async (req, res, next) => {
    const { title } = req.body;
    const image_Url = req.file ? req.file.filename : null; // Handle new image upload

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { title, image_Url },
      { new: true, runValidators: true }
    );

    if (!category) {
      return next(new ErrorHandler('Category not found', 404));
    }

    res.status(200).json({
      success: true,
      category,
    });
  })
);

// Delete Category
router.delete(
  '/delete-category/:id',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler('Category not found', 404));
    }

    // Optionally delete the image file from the server
    if (category.image_Url) {
      const filePath = `uploads/${category.image_Url}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete image:', err);
        }
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product Deleted Successfully!',
    });
  })
);

module.exports = router;
