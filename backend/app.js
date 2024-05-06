const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

// config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/.env',
  });
}

// Controller Routes
const user = require('./controller/user');
const order = require('./controller/order');
const admin = require('./controller/admin');
const product = require('./controller/product');
const event = require('./controller/event');
const coupon = require('./controller/couponCode');
const category = require('./controller/category');
const conversation = require('./controller/conversation');

app.use('/api/v2/user', user);
app.use('/api/v2/conversation', conversation);
app.use('/api/v2/order', order);
app.use('/api/v2/admin', admin);
app.use('/api/v2/product', product);
app.use('/api/v2/event', event);
app.use('/api/v2/coupon', coupon);
app.use('/api/v2/category', category);

// ErrorHandling
app.use(ErrorHandler);

module.exports = app;
