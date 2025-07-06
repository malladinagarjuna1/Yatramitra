const mongoose = require('mongoose');
const { getFlightBookingDB } = require('../database');

// Define flight schema
const flightSchema = new mongoose.Schema({
    flightNumber: String,
    airline: String,
    route: {
        from: String,
        to: String,
        fromCity: String,
        toCity: String
    },
    pricing: {
        economy: Number,
        business: Number
    }
});

// Function to get Flight model
const getFlightModel = () => {
    const flightBookingDB = getFlightBookingDB();
    if (!flightBookingDB) {
        throw new Error('Database not connected yet');
    }
    return flightBookingDB.model('Flight', flightSchema, 'flights');
};

module.exports = getFlightModel;