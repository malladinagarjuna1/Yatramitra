// app.get('/api/seats', async (req, res) => {
//   const seats = await Seat.find();
//   res.json(seats);
// });
const express = require("express");
const router = express.Router();
const mongoose= require('mongoose');



const getSeatModel = require('../models/seat');
router.post('/addaseat', async(req, res)=>{
      try {const Seat = getSeatModel();
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

router.get('/seats', async (req, res) => {
  try {
    const Seat = getSeatModel();
    const { flightNumber } = req.query;
    if (!flightNumber) {
      return res.status(400).json({ error: "Flight number is required" });
    }
    const seats = await Seat.find({ flightNumber: flightNumber });
    res.json(seats);
  } catch (err) {
    console.error("not able to get the seats", err);
    res.status(500).json({ error: "Internal server error" });
  }
});





const releaseExpiredLocks = async () => {
  const Seat = getSeatModel();

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  await Seat.updateMany(
    { status: 'locked', lockedAt: { $lt: fiveMinutesAgo } },
    { $set: { status: 'available', lockedAt: null } }
  );
};


setInterval(releaseExpiredLocks, 60 * 1000); 

router.put('/seats/lock', async (req, res) => {
  try {
    const Seat = getSeatModel();
    const { flightNumber, seatNumbers } = req.body;

    const seats = await Seat.find({
      flightNumber: flightNumber,
      seatNumber: { $in: seatNumbers },
    });

    if (seats.length !== seatNumbers.length) {
      return res.status(404).json({ error: "One or more seats not found" });
    }

    for (const seat of seats) {
      if (seat.status !== 'available') {
        return res.status(400).json({ error: `Seat ${seat.seatNumber} is not available` });
      }
    }

    const lockedAt = new Date();
    await Seat.updateMany(
      { _id: { $in: seats.map(s => s._id) } },
      { $set: { status: 'locked', lockedAt: lockedAt } }
    );

    res.json({ message: 'Seats locked successfully' });

  } catch (err) {
    console.error(" Failed to lock seats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/seats/book', async (req, res) => {
  try {
    const Seat = getSeatModel();
    const { flightNumber, seatNumbers } = req.body;

    const seats = await Seat.find({
      flightNumber: flightNumber,
      seatNumber: { $in: seatNumbers },
    });

    if (seats.length !== seatNumbers.length) {
      return res.status(404).json({ error: "One or more seats not found" });
    }

    for (const seat of seats) {
      if (seat.status !== 'locked') {
        return res.status(400).json({ error: `Seat ${seat.seatNumber} is not locked` });
      }
    }

    await Seat.updateMany(
      { _id: { $in: seats.map(s => s._id) } },
      { $set: { status: 'booked', lockedAt: null } }
    );

    res.json({ message: 'Seats booked successfully' });

  } catch (err) {
    console.error(" Failed to book seats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

