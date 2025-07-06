const mongoose = require('mongoose');
const { getFlightBookingDB } = require('../config/db');


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

const getFlightModel = () => {
    const flightBookingDB = getFlightBookingDB();
    if (!flightBookingDB) {
        throw new Error('Database not connected yet');
    }
    return flightBookingDB.model('Flight', flightSchema, 'flights');
};



module.exports = getFlightModel;