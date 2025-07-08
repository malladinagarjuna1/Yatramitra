const mongoose = require('mongoose');
const {getpassengerDB} = require('.././config/passenger');

const passengerSchema = new  mongoose.Schema({
    firstandMiddlename: String,
    LastName: String, 
    Dateofbirth: String,

});

const getpassengerModel = () => {
    const passengerDB = getpassengerDB();
    if (!passengerDB) {
        throw new Error('Database not connected yet');
    }
    const Passenger= passengerDB.model('Passenger', passengerSchema, 'passenger');
      console.log(" Connected to collection:", Passenger.collection.name); 
    return Passenger;
    
    
};



module.exports = getpassengerModel;
