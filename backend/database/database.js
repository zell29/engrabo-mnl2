const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(
        `Mongo DB connected with server: ${mongoose.connection.host}`
      );
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
};

module.exports = connectDatabase;
