import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
    seatNumber: Number,
    isBooked: {type: Boolean, defaut},
    coach: String, 
      bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  bookingTime: Date

})

export default mongoose.model("Seat", seatSchema);
