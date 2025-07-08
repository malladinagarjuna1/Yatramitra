const mongoose = require('mongoose');
const { getseatbookingDB }= require('./../config/seat')
const seatSchema = new mongoose.Schema({
  seatNumber:{
    type: String, 
    required: true
  },
      flightNumber: String,
  status: { 
  type: String, 
  enum: ['available', 'locked', 'booked'],
  default:'available'
  },
  lockedAt:{
    type: Date,
    default: null
  }

});
mongoose.connection.on('connected', async () => {
  const db = mongoose.connection.db;

  try {
    const collections = await db.listCollections().toArray();
    console.log(' Collections in the current DB:');
    collections.forEach(col => console.log('🔹', col.name));
  } catch (err) {
    console.error('Error listing collections:', err);
  }
});
const getseatModel = () => {
    const seatbookingDB = getseatbookingDB();
    if (!seatbookingDB) {
        throw new Error('Database not connected yet');
    }
    const Seat= seatbookingDB.model('Seat', seatSchema, 'seats');
      console.log(" Connected to collection:", Seat.collection.name); 
    return Seat;
    
    
};



module.exports = getseatModel;