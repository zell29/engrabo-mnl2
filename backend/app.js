const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
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

app.use('/api/v2/user', user);

// ErrorHandling
app.use(ErrorHandler);

module.exports = app;
