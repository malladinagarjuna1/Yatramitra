
const express = require('express');
const router = express.Router();
const bus = require('../models/bus');

router.post('/search bus', (req, res)=>{
    const{from, to, departureTime, departuredate, numberofpassengers } = req.body;
       try {
        const flights = Flight.find({
            from: {$regex: new RegExp(from, "i")},
            to: {$regex: new RegExp(to,'i')},
            departuredate:{$regex: new RegExp(departuredate,'i')},
   numberofpassengers:{$regex: new RegExp(numberofpassengers,'i')},
   departureTime: {$regex: new RegExp(departureTime,'i')},
      arrivalTime:{$regex: new RegExp(arrivingTime,'i')},
          duration:{$regex: new RegExp(duration,'i')},
          price: {$regex: new RegExp(price,'i')},
          seatsAvailable: {$regex: new RegExp(price, 'i')},
          
                });
        res.json({status:"success", flights})
      }catch(err) {
        res.status(500).json({ status: "error", message: err.message });
      }
});

router.get('/bus/id:', (req, res)=>{
     const {from , to }= req.query;

     try{
      const buses= bus.find({
        from:{$regex: new RegExp(from, "i")},
        to: {$regex: new RegExp(from, "i")}
      });
      res.json({
        status: 'success',
        data: buses
      });
     }
     catch(err){
      res.json({
        status:'failed',
          message:err.message
      });

     }
})

router.post('/book', (req, res)=>{
  const {busId, userId}= req.body;
  try{
    const bus= bus.findById(busId);
    if(!bus) return res.status(404).json({message:"flight not found"});

    const newBooking = new Booking({
      busId,
      userId,
      status: "confirmed",
      bookingTime: newDate(),
    })
     newbooking.save();
res.status.json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

module.exports = router;



 