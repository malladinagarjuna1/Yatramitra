

const express = require('express');
const router = express.Router();







const getFlightModel = require('./../models/flight');

 




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

router.get('/flight/id', async (req, res)=>{
     

     try{const Flight = getFlightModel();
           const {from , to, fromCity, toCity, date }= req.query;
  const query = {};
        if (from) query['route.from'] = from;
        if (to) query['route.to'] = to;
        if (fromCity) query['route.fromCity'] = fromCity;
        if (toCity) query['route.toCity'] = toCity;
        if(date)query['route.date']= date;
        console.log(query);
        
        const flights = await Flight.find(query);
        res.json(flights);
        
    } catch (error) {
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
})
router.post('/')
module.exports = router;
