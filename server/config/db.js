require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

async function connectToMongoDB() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB cluster');
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
}



let flightBookingDB;
connectToMongoDB().then(() => {
  
    flightBookingDB = mongoose.connection.useDb('flightAPI');
   
    console.log('Databases connected');
}).catch(err => {
    console.error('Failed to connect to databases:', err);
});

module.exports = {
    connectToMongoDB,
    getFlightBookingDB: () => flightBookingDB,
  
};