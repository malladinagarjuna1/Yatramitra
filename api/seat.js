// app.get('/api/seats', async (req, res) => {
//   const seats = await Seat.find();
//   res.json(seats);
// });
const express = require("express");
const router = express.Router();
const mongoose= require('mongoose');



const getseatModel  = require("./../models/seat")
router.post('/addaseat', async(req, res)=>{
      try {const Seat = getseatModel();
         const { seatNumber, flightNumber} = req.body;
     
         
         const newSeat = new Seat({
           seatNumber,
           flightNumber
          
         });
     
         const savedSeat = await newSeat.save();
         res.status(201).json(savedSeat);
       } catch (err) {
         res.status(400).json({ error: err.message });
       }
});

router.get('/seats', async(req, res)=>{
   try{ const Seat = getseatModel();
    console.log(Seat);
    const seats = await Seat.find();
    console.log(seats);
    res.json(seats);}
    catch(err){
     console.log("not able to get the seats", err);
    }
});




router.put('/seats/book', async (req, res) => {
  try {
    const Seat = getseatModel();

    const { flightNumber, seatNumber } = req.body;

    console.log("flightId:", flightNumber);
    console.log("seatNumber:", seatNumber);

    
    const seat = await Seat.findOne({
  flightNumber: flightNumber,
  seatNumber: seatNumber,
});

    console.log("Found seat:", seat);

    if (!seat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    if (seat.status !== 'available') {
      return res.status(400).json({ error: "Seat is not available" });
    }

    seat.status = 'locked';
    seat.lockedAt = new Date();

    await seat.save();

    res.json({ message: 'Seat locked successfully' });

  } catch (err) {
    console.error(" Failed to lock seat:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/book/:seatid', async(req, res)=>{
   try{  const Seat = getseatModel();
 
    const seat = await Seat.findById(req.params.seatId);
     if(!seat || !seat.status == 'locked'){
        return res.status(400).json({message:"seat not locked or already locked "});

     }
    seat.status= 'booked';
seat.locked= null;
await seat.save();

res.json({message: 'Seat booked successfully'});}
catch(err){
     console.log("not able to book a particular seat",err);
}
});

router,

module.exports = router;

