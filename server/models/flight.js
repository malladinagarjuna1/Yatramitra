const mongoose = require('mongoose');
const { getDB } = require('../config/db');

const flightSchema = new mongoose.Schema({
    flightNumber: String,
    airline: String,
    from: String,
    to: String,
    fromCity: String,
    toCity: String,
    date: String,
    departureTime: String,
    arrivalTime: String,
    price: String,
    duration: String
});

const getFlightModel = () => {
    const db = getDB();
    return db.model('Flight', flightSchema, 'flights');
};

module.exports = getFlightModel;