// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true
  },
  seatNumbers: {
    type: [String], // Array of seat IDs like ["1A", "1B"]
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  departure: {
    type: String, // or Date if using real datetime
    required: true
  },
  arrival: {
    type: String, // or Date
    required: true
  },
  passengerName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
