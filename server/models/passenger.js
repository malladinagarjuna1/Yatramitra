const mongoose = require('mongoose');
const { getDB } = require('../config/db');

const passengerSchema = new mongoose.Schema({
    firstandMiddleName: String,
    LastName: String,
    Dateofbirth: String,
});

const getPassengerModel = () => {
    const db = getDB();
    return db.model('Passenger', passengerSchema, 'passenger');
};

module.exports = getPassengerModel;
