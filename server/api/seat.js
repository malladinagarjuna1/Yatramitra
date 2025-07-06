// app.get('/api/seats', async (req, res) => {
//   const seats = await Seat.find();
//   res.json(seats);
// });

const { default: seat, default: seat } = require("../models/seat")

app.get('/api/seats', async(req, res)=>{
    const seats = await seat.find();
    res.json(seats);
});

app.put('/api/seats/:id/book', async(req, res)=>{
    const seat = await seat.findById(req.params.id);
    if(seat.isBooked) return res.status(400).json({message: 'Seat already booked'});
    seat.isBooked= true;
    seat.bookedBy= req.user._id;
    seat.bookingTime = new Date();
    await seat.save();
      res.json({ message: 'Seat booked successfully' });
})