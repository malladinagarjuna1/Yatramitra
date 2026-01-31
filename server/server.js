const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();
const path = require('path');

const cors = require('cors');

const { connectToMongoDB } = require('./config/db');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
 origin: "http://localhost:5173", 
  credentials: true      

}));
app.use(express.json());

connectToMongoDB()
  .then(() => {
    const UserRouter = require('./api/user.js');
    app.use('/', UserRouter);
    app.get('/', (req, res) => {
      res.send('Hello World');
    });

    const FlightRouter = require('./api/flight');
    app.use('/api', FlightRouter);
    const seatRouter = require('./api/seat');
    app.use('/api', seatRouter);
    const passengers = require('./api/passenger.js');
    app.use('/api', passengers);

    const payment = require('./api/payment.js');
    app.use('/api', payment);
    const ticket = require('./api/ticket.js');
  app.use('/api', express.static(path.join(__dirname, 'tickets')), ticket);


    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize application:', err);
    process.exit(1);
  });


