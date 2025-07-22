import React, { useState,   useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const [flightData, setFlightData]= useState({
   flightNumber: ' ',
       seatNumbers: [],
    from: '',
    to: '',
    departure: '',
    arrival: ''

  });

  useEffect(() => {
      const params = new URLSearchParams(location.search);

    const flightNumber = params.get('flightNumber');
    const seatNumbers = params.get('seatNumbers')?.split(',') || [];
    const from = params.get('from');
    const to = params.get('to');
    const departure = params.get('departure');
    const arrival = params.get('arrival');
        setFlightData({ flightNumber, seatNumbers, from, to, departure, arrival });

    const bookSeats = async () => {
      try {
 

        await axios.put('http://localhost:5000/api/seats/book', {
          flightNumber,
          seatNumbers,
        });
      } catch (error) {
        console.error('Error booking seats:', error);
      }
    };

    bookSeats();
  }, [location]);

  return (
     <div>
      <h1> Payment Successful!</h1>
      <p><strong>Flight:</strong> {flightData.flightNumber}</p>
      <p><strong>Route:</strong> {flightData.from} ➡️ {flightData.to}</p>
      <p><strong>Departure:</strong> {flightData.departure}</p>
      <p><strong>Arrival:</strong> {flightData.arrival}</p>
      <p><strong>Seats:</strong> {flightData.seatNumbers.join(', ')}</p>
    </div>
  );
};

export default PaymentSuccess;