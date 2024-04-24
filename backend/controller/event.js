const express = require('express');
const { isAdmin } = require('../middleware/auth');
const router = express.Router();
const catchAsyncError = require('../middleware/catchAsyncError');
const Admin = require('../model/admin');
const { upload } = require('../multer');
const Event = require('../model/event');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require('fs');

// Create Event
router.post(
  '/create-event',
  upload.array('images'),
  catchAsyncError(async (req, res, next) => {
    try {
      const adminId = req.body.adminId;
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return next(new ErrorHandler('Admin Id is invalid', 400));
      }
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.admin = admin;

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all Events
router.get(
  '/get-all-events/:id',
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find({ adminId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete Event
router.delete(
  '/delete-admin-event/:id',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const eventData = await Event.findById(eventId);
      if (!eventData) {
        return next(new ErrorHandler('Event not found with this id!', 404));
      }

      eventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      await Event.findByIdAndDelete(eventId);
      res.status(200).json({
        success: true,
        message: 'Event deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all events
router.get('/get-all-events', async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Search Events by name or other attributes
router.get(
  '/search-events',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const search = req.query.search;
      const regex = new RegExp(search, 'i');
      const events = await Event.find({
        $or: [
          { name: { $regex: regex } },
          { location: { $regex: regex } }, // Example of additional field
          // Add more fields if needed
        ],
      });

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
