const express = require('express');
const path = require('path');
const User = require('../model/user');
const router = express.Router();
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail'); // Ensure this path is correct
const sendToken = require('../utils/jwtToken');
const { isAuthenticated } = require('../middleware/auth');

router.post('/create-user', upload.single('file'), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
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

    const fileUrl = req.file ? req.file.path : '';
    const publicId = req.file ? req.file.filename : '';

    // Store user data in a temporary place or directly in the token if it's not too large (ensure sensitive info is securely handled)
    const activationToken = createActivationToken({
      name,
      email,
      password: password, // Consider hashing the password before including it in the token
      avatar: {
        public_id: publicId,
        url: fileUrl,
      },
    });

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    await sendMail({
      email: email,
      subject: 'Activate your account!',
      message: `Hello ${name}, please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${email} to activate your account`,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error processing request' });
  }
});

// Create activation token
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
    expiresIn: '5m',
  });
};

// Activate user
router.post(
  '/activation',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler('Invalid Token', 400));
      }

      const { name, email, password, avatar } = newUser;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler('User already exists', 400));
      }

      // Now, create the user with the verified information
      user = await User.create({
        name,
        email,
        avatar,
        password: password, // Ensure the password is hashed before saving
      });

      sendToken(user, 201, res); // Assuming this function handles token creation and response
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login user
router.post(
  '/login-user',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler('Please provide all the fields', 400));
      }

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler('Please enter your credentials correctly!', 400)
        );
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load user
router.get(
  '/getuser',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
