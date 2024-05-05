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
      return next(new ErrorHandler('admin already exists', 400));
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

// Activate admin
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

// Get admin info
router.get(
  '/get-admin-info/:id',
  catchAsyncError(async (req, res, next) => {
    try {
      const admin = await Admin.findById(req.params.id);
      res.status(201).json({
        success: true,
        admin,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update admin profile picture
router.put(
  '/update-admin-avatar',
  isAdmin,
  upload.single('image'),
  async (req, res, next) => {
    try {
      const admin = await Admin.findById(req.admin.id);
      if (!admin) {
        return next(new ErrorHandler('admin not found', 404));
      }

      // Delete the existing avatar file if it exists
      if (admin.avatar && admin.avatar.url) {
        const existAvatarPath = path.join('uploads', admin.avatar.url);
        if (fs.existsSync(existAvatarPath)) {
          fs.unlinkSync(existAvatarPath);
        } else {
          console.log('Previous avatar file not found:', existAvatarPath);
        }
      }

      const fileUrl = req.file ? req.file.filename : admin.avatar.url; // Fallback to existing if no file provided

      // Update admin document
      admin.avatar = { public_id: req.file.filename, url: fileUrl };
      await admin.save();

      res
        .status(200)
        .json({ success: true, message: 'Avatar updated', admin: admin });
    } catch (error) {
      console.error('Failed to update avatar:', error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update admin info
router.put(
  '/update-user-info',
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const admin = await Admin.findOne(req.admin._id);

      if (!admin) {
        return next(new ErrorHandler('Admin not found', 400));
      }

      admin.name = name;
      admin.description = description;
      admin.address = address;
      admin.phoneNumber = phoneNumber;
      admin.zipCode = zipCode;

      await admin.save();

      res.status(201).json({
        success: true,
        admin,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update admin password
router.put(
  '/update-admin-password',
  isAuthenticated,
  isAdmin,
  catchAsyncError(async (req, res, next) => {
    try {
      const admin = await Admin.findById(req.admin._id).select('+password');

      if (!(await admin.comparePassword(req.body.oldPassword))) {
        return next(new ErrorHandler('Current password is incorrect!', 400));
      }

      admin.password = req.body.newPassword; // Ensure you hash the password if it isn't handled in your model
      await admin.save();

      res.status(200).json({
        success: true,
        message: 'Password updated successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
