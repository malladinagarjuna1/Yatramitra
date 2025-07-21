import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const bookSeats = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const flightNumber = params.get('flightNumber');
        const seatNumbers = params.get('seatNumbers').split(',');

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
      <h1>Payment Successful!</h1>
      <p>Your seats have been booked.</p>
    </div>
  );
};

export default PaymentSuccess;