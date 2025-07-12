require('./config/db');
const express = require('express');
const app = express();
const port =5000;
require('dotenv').config();

const cors = require('cors');
const { connectToMongoDB } = require('./config/seat');

app.use(cors());
app.use(express.json());

connectToMongoDB()
  .then(() => {
 const UserRouter = require('./api/user.js');
app.use('/', UserRouter);
app.get('/',(req, res)=>{
    res.send('Hello World');
})


const FlightRouter = require('./api/flight');
app.use('/api', FlightRouter);
const seatRouter = require('./api/seat');
app.use('/api', seatRouter);
const passengers = require('./api/passenger.js');
app.use(express.json());
app.use('/api', passengers);

const payment= require('./api/payment.js');
app.use(express.json());
app.use('/api',payment);
app.listen(port, () =>{
    console.log(`server is running on port ${port}`);

});

  })
  .catch(err => {
    console.error('Failed to initialize application:', err);
    process.exit(1);
  });


