const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your product name'],
  },

  description: {
    type: String,
    required: [true, 'Please enter your product description'],
  },

  category: {
    type: String,
    required: [true, 'Please enter your product description'],
  },

  tags: {
    type: String,
    required: [true, 'Please enter your product description'],
  },

  originalPrice: {
    type: Number,
    required: [true, 'Please enter your product price'],
  },

  discountPrice: {
    type: Number,
  },

  stock: {
    type: Number,
    required: [true, 'Please enter your product stock'],
  },

  images: [
    {
      type: String,
    },
  ],

  adminId: {
    type: String,
    required: true,
  },

  admin: {
    type: Object,
    required: true,
  },

  sold_out: {
    type: Number,
    default: 0,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);
