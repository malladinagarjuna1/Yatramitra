
const mongoose = require('mongoose');

const forgotSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  token: {
    type: String,
    required: true
  },
  expires: {
    type: Number, 
    required: true
  }
});

module.exports = mongoose.model('Forgot', forgotSchema);
