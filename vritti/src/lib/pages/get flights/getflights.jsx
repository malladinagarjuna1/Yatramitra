import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import "./getflights.css";

function FlightBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights, from, to } = location.state || { flights: [], from: '', to: '' };
  console.log("Flights passed to page:", flights);

  const handleBook = (flight) => {
    navigate('/seatMap', { state: { flight } });

  };   

  return (
    <div className="flight-booking-container">
      <header className="header">
        <h2>
          Choose your preferred flight from <span className="green">{from}</span> to{" "}
          <span className="green">{to}</span>
        </h2>
      </header>
      
      {flights.length === 0 && (
        <div className="no-flights-message">No flights found for this route.</div>
      )}

      {flights.length > 0 && (
        <div className="flight-list">
          {flights.map((flight, idx) => (
            <Card className="flight-card" key={idx}>
              <CardHeader>
                <CardTitle className={"flight-airline"}>{flight.airline} - {flight.flightNumber}</CardTitle>
                <CardDescription className={"journey"}>From {flight.from} to {flight.to}</CardDescription>
                <CardDescription className={"date"}>Date: {flight.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flight-details">
                  <div className="time-info">
                    <div className="time">{flight.departureTime}</div>
                    <div className="location">{flight.from}</div>
                  </div>
                  <div className="duration-info">
                    <div className="duration">{flight.duration}</div>
                    <div className="stops">Non-stop</div>
                  </div>
                  <div className="time-info">
                    <div className="time">{flight.arrivalTime}</div>
                    <div className="location">{flight.to}</div>
                  </div>
                </div>
                <div className="price-info">
                  <div className="price">Starts at ₹{flight.price}</div>
                  <div className="rewards">+ Earn Rewards</div>
                </div>
                <Button onClick={() => handleBook(flight)}>Book</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightBookingPage;