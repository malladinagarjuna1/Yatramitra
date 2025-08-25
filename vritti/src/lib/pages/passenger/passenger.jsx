
import './passenger.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react';


import { Button } from '../components/ui/button';
import axios from 'axios';

const   Passenger = ({ selectedSeats, flight, passengerDetails, onPassengerChange }) => {
  const handleChange = (seatId, field, value) => {
    onPassengerChange(seatId, {
      ...passengerDetails[seatId],
      [field]: value
    });
  };

  const handleProceedToPayment = async () => {
    try {
      const firstPassenger = passengerDetails[selectedSeats[0]];
      if (!firstPassenger?.email || !firstPassenger?.mobile) {
        alert('Please fill out all required contact information for the first passenger before proceeding.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(firstPassenger.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      console.log(flight);
      await axios.put('http://localhost:5000/api/seats/lock', {
        flightNumber: flight.flightNumber,
        seatNumbers: selectedSeats,
        from: flight.from,
        to: flight.to,
        departure: flight.departureTime,
        arrival: flight.arrivalTime
      });

    
      const totalAmount = selectedSeats.length * flight.price;
      const obj= {
         email: firstPassenger.email,
          flightNumber: flight.flightNumber,
          seatNumbers: selectedSeats,
          from: flight.from,
          to: flight.to,
          departure: flight.departureTime,
          arrival: flight.arrivalTime
      }
      console.log(obj);
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          passengers: selectedSeats.length,
          email: firstPassenger.email,
          flightNumber: flight.flightNumber,
          seatNumbers: selectedSeats,
          from: flight.from,
          to: flight.to,
          departure: flight.departureTime,
          arrival: flight.arrivalTime
        }),
      });

      const session = await response.json();

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create checkout session.');
      }


      window.location.href = session.url;

    } catch (error) {
      console.error('Error proceeding to payment:', error);
      alert(error.message || 'Failed to proceed to payment. Please try again.');
    }
  };

  return (  
    <div className="flight-form-container">
      <div className="tabs">
        <button
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)"
          }}
        >
          <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ffffff" }} />
          Flight
        </button>
      </div>

      {selectedSeats.length === 0 ? (
        <p style={{ color: "#777" }}>Please select seat(s) to enter passenger details.</p>
      ) : (
        <>
          {selectedSeats.map((seatId, index) => (
            <div key={seatId} className="passenger-form">
              <h3>Passenger {index + 1} — Seat {seatId}</h3>

              <div className="gender-selection">
                <label>
                  <input
                    type="radio"
                    name={`gender-${seatId}`}
                    value="Male"
                    checked={passengerDetails[seatId]?.gender === "Male"}
                    onChange={() => handleChange(seatId, "gender", "Male")}
                  /> Male
                </label>
                <label>
                  <input
                    type="radio"
                    name={`gender-${seatId}`}
                    value="Female"
                    checked={passengerDetails[seatId]?.gender === "Female"}
                    onChange={() => handleChange(seatId, "gender", "Female")}
                  /> Female
                </label>
              </div>

              <div className="input-box">
                <label>First and Middle Name</label>
                <input className='jam'
                  type="text"
                  value={passengerDetails[seatId]?.firstName || ""}
                  onChange={(e) => handleChange(seatId, "firstName", e.target.value)}
                  placeholder="As per government ID"
                />
              </div>

              <div className="input-box">
                <label>Last Name</label>
                <input className='jam'
                  type="text"
                  value={passengerDetails[seatId]?.lastName || ""}
                  onChange={(e) => handleChange(seatId, "lastName", e.target.value)}
                />
              </div>

       
              <div className="input-box">
                <label>Date of Birth</label>
                <input className='jam'
                  type="date"
                  value={passengerDetails[seatId]?.dob || ""}
                  onChange={(e) => handleChange(seatId, "dob", e.target.value)}
                />
              </div>

          
              <button className="optional-btn">Special Assistance</button>
              <button className="optional-btn">Add IndiGo BluChip Membership Number</button>
              {index === 0 && (
                <>
                  <h4>Contact details</h4>
                  <p>The flyer must have access to the mobile number submitted below for travel updates.</p>

                  <div className="input-box">
                    <label>Phone Number</label>
                    <div className="phone-input">
                      <span>+91</span>
                      <input className='jam'
                        type="tel"
                        placeholder="Flyer's primary mobile number"
                        value={passengerDetails[seatId]?.mobile || ""}
                        onChange={(e) => handleChange(seatId, "mobile", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-box">
                    <label>Email ID</label>
                    <input className='jam'
                      type="email"
                      placeholder="Email ID"
                      value={passengerDetails[seatId]?.email || ""}
                      onChange={(e) => handleChange(seatId, "email", e.target.value)}
                    />
                  </div>

                  <a href="#add-contact" className="add-contact-link">+ Add another contact</a>
                </>
              )}
            </div>
          ))}
          <Button onClick={handleProceedToPayment}>Proceed to Payment</Button>
        </>
      )}
    </div>
  );
};

export default Passenger;
