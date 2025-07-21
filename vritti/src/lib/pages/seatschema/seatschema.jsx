import React, { useState, useEffect } from "react";
import axios from "axios";
import './seatschema.css';

const SeatSchema = ({ selectedSeats, onSeatClick, flightNumber }) => {
  const [seatMap, setSeatMap] = useState([]);

  useEffect(() => {
    if (flightNumber) {
      axios.get(`http://localhost:5000/api/seats?flightNumber=${flightNumber}`)
        .then(response => {
          const seats = response.data;
          console.log(response.data);
          const rows = {};
          seats.forEach(seat => {
            const row = seat.seatNumber.slice(0, -1);
            if (!rows[row]) {
              rows[row] = { row, seats: [] };
            }
            rows[row].seats.push({ id: seat.seatNumber.slice(-1), booked: seat.status === 'booked' });
          });
          setSeatMap(Object.values(rows));
        })
        .catch(error => {
          console.error("Error fetching seats:", error);
        });
    }
  }, [flightNumber]);

  return (
    <div className="seat-map">
      {seatMap.map((rowObj) => (
        <div key={rowObj.row} className="seat-row">
          <span className="row-number">{rowObj.row}</span>
          {rowObj.seats.map((seat, index) => {
            if (seat === null) {
              return <div key={index} className="aisle"></div>;
            }

            const seatId = `${rowObj.row}${seat.id}`;
            const isSelected = selectedSeats.includes(seatId);
            const isBooked = seat.booked;

            return (
              <div
                key={index}
                className={`seat ${getSeatClass(rowObj.row, seat.id)} ${
                  isSelected ? "selected" : ""
                } ${isBooked ? "booked" : ""}`}
                onClick={() => !isBooked && onSeatClick(rowObj.row, seat.id)}
              >
                {seat.id}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};


const getSeatClass = (row, seatId) => {
  if ([51, 66, 80].includes(row)) return "exit-row";
  if (row === 64 && ['D', 'E', 'F', 'G'].includes(seatId)) return "bassinet";
  return "standard";
};

export default SeatSchema;
