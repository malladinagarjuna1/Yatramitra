import React from "react";
import { motion } from "framer-motion";
import './seatschema.css';

const SeatSchema = ({
  selectedSeats,
  setSelectedSeats, // ✅ needed for updating selection
  onSeatClick,
  flightNumber,
  totalRows,
  seatsPerRow
}) => {
  const seats = [];

  const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, totalRows);

  for (let i = 0; i < rowLetters.length; i++) {
    const rowLetter = rowLetters[i];
    for (let num = 1; num <= seatsPerRow; num++) {
      const seat = `${rowLetter}${num}`;
      seats.push({ row: rowLetter, seat });
    }
  }

  return (
    <div className="seat-schema-wrapper">
      <h2 className="schema-title">Seat Selection - Flight {flightNumber}</h2>
      <motion.div
        className="seat-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {seats.map(({ row, seat }) => {
          const isSelected = selectedSeats.includes(seat);
          const isUnavailable = Math.random() > 0.8; // ❗ replace with static logic if needed

          return (
            <motion.div
              key={seat}
              className={`seat ${isSelected ? 'selected' : ''} ${isUnavailable ? 'unavailable' : ''}`}
              onClick={() => {
                if (isSelected || isUnavailable) return;

                console.log("Selected seat: ", seat);
                const seatId= `${row}${seat}`;
            
                onSeatClick(row, seat);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-seat={seat}
            >
              {seat}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="legend">
        <span className="legend-item">● Available</span>
        <span className="legend-item selected">● Selected</span>
        <span className="legend-item unavailable">● Unavailable</span>
      </div>
    </div>
  );
};

export default SeatSchema;
