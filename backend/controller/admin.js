const express = require('express');
const path = require('path');
const Admin = require('../model/admin');
const router = express.Router();
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/jwtToken');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const sendAdminToken = require('../utils/adminToken');

router.post('/create-admin', upload.single('file'), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminEmail = await Admin.findOne({ email });

    if (adminEmail) {
      if (req.file) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('Error deleting file:', err);
          }
        });
      }
      return next(new ErrorHandler('User already exists', 400));
    }
    const fileUrl = req.file ? req.file.filename : '';

    const publicId = req.file ? req.file.filename : '';

    const admin = {
      name: req.body.name,
      email: email,
      password: password,
      avatar: {
        public_id: publicId,
        url: fileUrl,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(admin);
    const activationUrl = `http://localhost:3000/admin/activation/${activationToken}`;

    await sendMail({
      email: email,
      subject: 'Activate your Admin Account!',
      message: `Hello ${admin.name}, please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${admin.email} to activate your account`,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error processing request' });
  }
});

// Create activation token
const createActivationToken = (admin) => {
  return jwt.sign(admin, process.env.ACTIVATION_SECRET, {
    expiresIn: '5m',
  });
};

// Activate user
router.post(
  '/activation',
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newAdmin = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newAdmin) {
        return next(new ErrorHandler('Invalid Token', 400));
      }

      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newAdmin;

      // Check if user already exists
      let admin = await Admin.findOne({ email });
      if (admin) {
        return next(new ErrorHandler('User already exists', 400));
      }
      // Now, create the user with the verified information
      admin = await Admin.create({
        name,
        email,
        avatar,
        password: password, // Ensure the password is hashed before saving
        zipCode,
        address,
        phoneNumber,
      });
      console.log(admin);
      sendAdminToken(admin, 201, res); // Assuming this function handles token creation and response
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login admin
router.post(
  '/login-admin',
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler('Please provide all the fields', 400));
      }

      const user = await Admin.findOne({ email }).select('+password');

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler('Please enter your credentials correctly!', 400)
        );
      }

      // Log the admin's ID and email right before sending the token
      console.log(`${user}`);

      sendAdminToken(user, 201, res); // Assuming this function handles token creation and response
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load admin
router.get(
  '/getAdmin',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      // console.log(req.admin);
      const admin = await Admin.findById(req.admin._id);

      if (!admin) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
      res.status(200).json({
        success: true,
        admin,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Logout Admin
router.get(
  '/logout',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie('admin_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: 'Logout Successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
