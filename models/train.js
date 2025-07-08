const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  TrainName: {
    type: String,
    required: true
  },
  TrainNumber: {
    type: String,
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
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

}, {
  timestamps: true
});

const Train = mongoose.model('Train', TrainSchema);
module.exports = Train;
