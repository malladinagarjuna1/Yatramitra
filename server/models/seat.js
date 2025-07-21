const mongoose = require('mongoose');
const { getDB } = require('../config/db');

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true
    },
    flightNumber: String,
    status: {
        type: String,
        enum: ['available', 'locked', 'booked'],
        default: 'available'
    },
    lockedAt: {
        type: Date,
        default: null
    }
});

const getSeatModel = () => {
    const db = getDB();
    return db.model('Seat', seatSchema, 'seats');
};

module.exports = getSeatModel;