import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './success.css';
import TicketPDF from '../tickets/tickets';
const handleDownload= async(ticketData)=>{
  console.log(ticketData);
  const blob = await pdf(<TicketPDF ticket={ticketData}/>).toBlob();
  const url = URL.createObjectURL(obj);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ticket.pdf';
    a.click();
    URL.revokeObjectURL(url);

}

        
const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  const [flightData, setFlightData] = useState(null);
  const [ticketURL, setTicketURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 useEffect(() => {
  const params = new URLSearchParams(location.search);
  const session_id = params.get('session_id');

  const flightNumber = params.get('flightNumber');
  const seatNumbers = params.get('seatNumbers')?.split(',') || [];
  const from = params.get('from');
  const to = params.get('to');
  const departureTime = params.get('departureTime');
  const arrivalTime = params.get('arrivaTime');

  if (!session_id) {
    setError('Missing payment session ID.');
    setLoading(false);
    return;
  }

  setFlightData({ flightNumber, seatNumbers, from, to, departureTime, arrivalTime });

  const verify = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payment/verify?session_id=${session_id}`);

      if (res.data.success) {
        console.log(res.data);
        setFlightData(res.data.booking);
        setTicketURL(res.data.ticketURL);
      } else {
        setError(res.data.message || 'Payment verification failed.');
      }
    } catch (err) {
      setError('Server error verifying payment.');
    } finally {
      setLoading(false);
    }
  };

  verify();
}, [location]);


  if (loading) return <p>Verifying payment and generating your ticket...</p>;

  if (error) return <div style={{ color: 'red', textAlign: 'center' }}><h2>❌ {error}</h2></div>;

  return (
    <div className="success-container">
      <h1> Payment Successful!</h1>
      <p><strong>Flight:</strong> {flightData.flightNumber}</p>
      <p><strong>Route:</strong> {flightData.from} ➡️ {flightData.to}</p>
      <p><strong>Departure:</strong> {flightData.departure}</p>
      <p><strong>Arrival:</strong> {flightData.arrival}</p>
    

      <h3>Your Ticket is Ready </h3>

      <a href={ticketURL} download={`Flight-Ticket-${flightData.flightNumber}.pdf`}>
        <button className="download-button" onClick={handleDownload(flightData)}>Download PDF Ticket</button>
      </a>

      <p>Or scan this QR code to download later:</p>
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(ticketURL)}&size=150x150`}
        alt="QR Code for ticket"
      />

      <button onClick={() => navigate('/')} className="home-button">
        Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
