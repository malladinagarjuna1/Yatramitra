const express = require('express');
const router = express.Router();
const Train = require('../models/train');


router.poster('/search trains',(req, res)=>{
    const{from, to, departureTime, departuredate, numberofpassengers }= req.body;
    try{
        const trains= Train.find({
             from: {$regex: new RegExp(from, "i")},
            to: {$regex: new RegExp(to,'i')},
            departuredate:{$regex: new RegExp(departuredate,'i')},
   numberofpassengers:{$regex: new RegExp(numberofpassengers,'i')},
   departureTime: {$regex: new RegExp(departureTime,'i')},
      arrivalTime:{$regex: new RegExp(arrivingTime,'i')},
          duration:{$regex: new RegExp(duration,'i')},
          price: {$regex: new RegExp(price,'i')},
          seatsAvailable: {$regex: new RegExp(price, 'i')},
        })
          res.json({status:"success", flights})
      }catch(err) {
        res.status(500).json({ status: "error", message: err.message });
    }
});

router.get('/trains/id:', (req, res)=>{
     const {from , to }= req.query;

     try{
      const trains= Train.find({
        from:{$regex: new RegExp(from, "i")},
        to: {$regex: new RegExp(from, "i")}
      });
      res.json({
        status: 'success',
        data: flights
      });
     }
     catch(err){
      res.json({
        status:'failed',
          message:err.message
      });

     }
});

router.book('/book', (req, res)=>{
    const{trainId, userId}= req.body;
    try{
        const trains = Train.findById{trainId};
        if(!trains)return  res.status(404).json({"train not found"});
        const newbooking = new Booking({
            trainId,
            userId,
            status:"confirmed",
            bookingTime: newDate(),

        })
        newbooking.save();
        res.status.json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }

    

});

module.exports = router;

