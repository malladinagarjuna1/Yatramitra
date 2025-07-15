import React, { useState } from 'react';
import './flightsearchcomponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faTrain, faBus } from '@fortawesome/free-solid-svg-icons';
const FlightSearch = () => {
  const [triptype, settriptype] = useState("round");
  const [from, setfrom] = useState("from");
  const [to, setto] = useState("to");
  const [departureDate, setDepartureDate] = useState("2024-09-09");
  const [returnDate, setReturnDate] = useState("2024-09-11");
  const [passengerCount, setPassengerCount] = useState(1);
  const [state, setState] = useState("flight");

  const renderForm = () => (
    <div className="flight-search">
      <div className="trip-type">
        <label>
          <input
            type="radio"
            name="triptype"
            value="round"
            checked={triptype === "round"}
            onChange={() => settriptype("round")}
          />
          Round Trip
        </label>
        <label>
          <input
            type="radio"
            name="triptype"
            value="oneway"
            checked={triptype === "oneway"}
            onChange={() => settriptype("oneway")}
          />
          One Way
        </label>
      </div>

      <div className="flight-fields">
        <div className="input-box">
          <label>From</label>
          <input value={from} onChange={(e) => setfrom(e.target.value)} />
        </div>

        <div className="input-box">
          <label>To</label>
          <input value={to} onChange={(e) => setto(e.target.value)} />
        </div>

        <div className="input-box">
          <label>Departure</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {triptype === "round" && (
          <div className="input-box">
            <label>Return</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}

        <div className="input-box">
          <label>Passengers</label>
          <input
            type="number"
            min="1"
            value={passengerCount}
            onChange={(e) => setPassengerCount(Number(e.target.value))}
          />
        </div>

        <button
          className="swap-btn"
          onClick={() => {
            const temp = from;
            setfrom(to);
            setto(temp);
          }}
        >
          ⇄
        </button>

        <button className="search-btn">🔍 Search Flight</button>
      </div>
    </div>
  );
  const jenderform=()=>{
    return(
       <div className="flight-search">
      <div className="trip-type">
        <label>
          <input
            type="radio"
            name="triptype"
            value="round"
            checked={triptype === "round"}
            onChange={() => settriptype("round")}
          />
          Round Trip
        </label>
        <label>
          <input
            type="radio"
            name="triptype"
            value="oneway"
            checked={triptype === "oneway"}
            onChange={() => settriptype("oneway")}
          />
          One Way
        </label>
      </div>

      <div className="flight-fields">
        <div className="input-box">
          <label>From</label>
          <input value={from} onChange={(e) => setfrom(e.target.value)} />
        </div>

        <div className="input-box">
          <label>To</label>
          <input value={to} onChange={(e) => setto(e.target.value)} />
        </div>

        <div className="input-box">
          <label>Departure</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {triptype === "round" && (
          <div className="input-box">
            <label>Return</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}

        <div className="input-box">
          <label>Passengers</label>
          <input
            type="number"
            min="1"
            value={passengerCount}
            onChange={(e) => setPassengerCount(Number(e.target.value))}
          />
        </div>

        <button
          className="swap-btn"
          onClick={() => {
            const temp = from;
            setfrom(to);
            setto(temp);
          }}
        >
          ⇄
        </button>

        <button className="search-btn">🔍 Search Train</button>
      </div>
    </div>);
  };
  const benderform=()=>{return(
          <div className="flight-search">
      <div className="trip-type">
        <label>
          <input
            type="radio"
            name="triptype"
            value="round"
            checked={triptype === "round"}
            onChange={() => settriptype("round")}
          />
          Round Trip
        </label>
        <label>
          <input
            type="radio"
            name="triptype"
            value="oneway"
            checked={triptype === "oneway"}
            onChange={() => settriptype("oneway")}
          />
          One Way
        </label>
      </div>

      <div className="flight-fields">
        <div className="input-box">
          <label>From</label>
          <input value={from} onChange={(e) => setfrom(e.target.value)} />
        </div>

        <div className="input-box">
          <label>To</label>
          <input value={to} onChange={(e) => setto(e.target.value)} />
        </div>

        <div className="input-box">
          <label>Departure</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {triptype === "round" && (
          <div className="input-box">
            <label>Return</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}

        <div className="input-box">
          <label>Passengers</label>
          <input
            type="number"
            min="1"
            value={passengerCount}
            onChange={(e) => setPassengerCount(Number(e.target.value))}
          />
        </div>

        <button
          className="swap-btn"
          onClick={() => {
            const temp = from;
            setfrom(to);
            setto(temp);
          }}
        >
          ⇄
        </button>

        <button className="search-btn">🔍 Search bus</button>
      </div>
    </div>);
    
  }

  return (
<div className="vertical-tabs-container">
    <div className="tabs">
        



      <button onClick={() => setState("flight")}style={{  backgroundColor: "rgba(255, 255, 255, 0.15)",  backdropFilter: "blur(15px)"}}>
<FontAwesomeIcon icon={faPlaneDeparture} style={{color: "#ffffff",}} />Flight </button>
      <button onClick={() => setState("train")}style={{  backgroundColor: "rgba(255, 255, 255, 0.15)",  backdropFilter: "blur(15px)"}}>
<FontAwesomeIcon icon={faTrain} style={{color: "#ffffff",}} />Train</button>
      <button onClick={() => setState("bus")}style={{  backgroundColor: "rgba(255, 255, 255, 0.15)",  backdropFilter: "blur(15px)"}}>

<FontAwesomeIcon icon={faBus} style={{color: "#ffffff",}} />Bus</button>
      </div>
<div className="content">
        {state==="flight"&& renderForm()}
        {state==="train"&& jenderform()}
        {state==="bus"&& benderform()}
</div>
    </div>
  );
};

export default FlightSearch;
