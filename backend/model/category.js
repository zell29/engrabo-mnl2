const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter category title'],
    unique: true,
  },
  image_Url: {
    type: String,
    required: [true, 'Please provide an image URL for the category'],
  },
});

module.exports = mongoose.model('Category', categorySchema);
