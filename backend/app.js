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

// Routes
const user = require('./controller/user');
const admin = require('./controller/admin');

app.use('/api/v2/user', user);
app.use('/api/v2/admin', admin);

// ErrorHandling
app.use(ErrorHandler);

module.exports = app;
