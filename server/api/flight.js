

const express = require('express');
const router = express.Router();







const getFlightModel = require('../models/flight');

 




router.get('/search-flights', async (req,res)=>{

      try {
         const Flight = getFlightModel();
        const flights = await  Flight.find();
        console.log(flights);
        res.json(flights);
             } 
             catch(error){
              res.status(500).json({error:error.message});

             }
});

router.get('/flight/id', async (req, res) => {
    try {
        const Flight = getFlightModel();
        
        // Destructure query parameters
        const { date, from, to} = req.query;

        // Build query dynamically
        const query = {};
   
        if (from) query['from'] = from;
        if (to) query['to'] = to;
     
        if (date) query['date'] = new RegExp('^' + date);
   
        

        console.log("Search query:", query);

        const flights = await Flight.find(query);

        res.json(flights);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/flight/:airline', async(req, res)=>{
  try{const Flight = getFlightModel();
    const {airline}= req.params;
  const flight = await Flight.find({ airline: new RegExp(airline, 'i') });

    res.json(flight);

  }catch(error){
       res.status(500).json({ error: error.message });
  }
});

router.get('/flights/price-range', async(req, res)=>{
  try{const Flight = getFlightModel();
    const{minPrice, maxPrice, classType}= req.query;
    const query = {};
    if( minPrice && maxPrice){
      if(classType === 'economy'){
        query['pricing.economy']= {$gte:parseInt(minPrice), $lte:parseInt(maxPrice) };

      } else if(classType === 'business') {
        query['pricing.business']={$gte: parseInt(minPrice), $lte: parseInt(maxPrice)};

      }
    }
     console.log(query);
    const flights= await Flight.find(query);
    res.json(flights);


  }
  catch(error){
      res.status(500).json({error: error.message});
  }
});
router.post('/flight/add', async (req, res) => {
  try {
    const Flight = getFlightModel();

    const {
    
        from,
        to,
        fromCity,
        toCity,
        date,
        departureTime,
        arrivalTime,
      
      flightNumber,
      airline,
      price,
      duration
    } = req.body;

    const newFlight = new Flight({
      
        from,
        to,
        fromCity,
        toCity,
        date,
        departureTime,
        arrivalTime,
      flightNumber,
      airline,
      price,
      duration
    });

    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
