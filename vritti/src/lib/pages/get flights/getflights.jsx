import React, {useEffect, useState} from 'react'
import "./getflights.css"


function FlightBookingPage() {
    const[flights, setflight]= useState([]);
    const[loading, setLoading]= useState(true);
    const[error, setError]= useState("");
    const[selectedDate, setSelectedDate]= useState("2025-07-16");
    const origin="DEL";

    const destination= "VTZ";
      useEffect(() => {
    setLoading(true);
    setError("");
      fetch(
      `/api/flights?origin=${origin}&destination=${destination}&date=${selectedDate}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setFlights(data.flights || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load flights. Please try again.");
        setLoading(false);
      });},[origin,destination,selectedDate]);
        const dateTabs = [
    "2025-07-15",
    "2025-07-16",
    "2025-07-17",
    "2025-07-18",
    "2025-07-19",
    "2025-07-20",
    "2025-07-21",
  ];

  return (
    <div className="flight-booking-container">
        <header className="header">
            <h2>
                       Choose your preferred flight from <span className="green">Delhi</span> to{" "}
          <span className="green">Visakhapatnam</span>
            </h2>
 </header>
 <div className="data-selector">
    {dateTabs.map((date)=>{
        <div 
        key = {date}
        className={`date-tab ${date === selectedDate ? "selected" : ""}`}
        onClick ={()=>setSelectedDate(date)}>
            {date}
            </div>
    })}
 </div>
 {loading && <div>Loading flights...</div>}
 {error && <div className="error">{error}</div>}
 {!loading && !error && flights.length===0 &&(
    <div>No flights found for this date.</div>
 )}
 
      {!loading && flights.length > 0 && (
        <div className="flight-list">
          {flights.map((flight, idx) => (
            <div className="flight-card" key={idx}>
              <div className="flight-main">
                <div>
                  <div className="flight-number">{flight.flightNumber}</div>
                  <div className="flight-times">
                    <span>
                      {flight.departureTime} <span className="airport">{flight.origin}</span>
                    </span>
                    <span className="duration">
                      {flight.duration} | {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
                    </span>
                    <span>
                      {flight.arrivalTime} <span className="airport">{flight.destination}</span>
                    </span>
                  </div>
                </div>
                <div className="flight-pricing">
                  <div>
                    <div className="cabin">{flight.cabinClass || "Economy"}</div>
                    <div className="price">
                      {flight.currency} {flight.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightBookingPage;