const mongoose = require('mongoose');
const { getpassengerDB , connectToMongoDB} = require('.././config/seat');

const passengerSchema = new mongoose.Schema({
  firstandMiddleName: String,
  LastName: String,
  Dateofbirth: String,
});
let Passenger = null;
async function initializePassengerModel() {
  await connectToMongoDB();
  const db =   getpassengerDB()  ;
  
  if (!db) throw new Error('Database not connected');
  
  Passenger = db.model('Passenger', passengerSchema, 'passenger');
  console.log('Passenger model initialized');
  return Passenger;
}
module.exports = initializePassengerModel;
