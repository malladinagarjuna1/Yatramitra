// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import SeatSchema from "../seatschema/seatschema";
// import Passenger from "../passenger/passenger";
// import './wrappercontent.css';

// const SeatSelectionWrapper = () => {
//   const location = useLocation();
//   const { flight } = location.state || {};
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [passengerDetails, setPassengerDetails] = useState({});
//   const [showPassenger, setShowPassenger] = useState(false);

//   const handleSeatClick = (row, seat) => {
//     const seatId = `${row}${seat}`;
//     setSelectedSeats((prevSelected) => {
//       const newSelected = prevSelected.includes(seatId)
//         ? prevSelected.filter((s) => s !== seatId)
//         : [...prevSelected, seatId];

//       if (newSelected.length > 0) {
//         setShowPassenger(true);
//       } else {
//         setShowPassenger(false);
//       }
//       return newSelected;
//     });
//   };

//   const handlePassengerChange = (seatId, data) => {
//     setPassengerDetails(prev => ({
//       ...prev,
//       [seatId]: data
//     }));
//   };

//   return (
//     <div className="seat-selection-container">
//       {flight ? (
//         <>
//           <div className="seat-schema-container">
//             <SeatSchema
//               selectedSeats={selectedSeats}
//               onSeatClick={handleSeatClick}
//               flightNumber={flight.flightNumber}
//             />
//           </div>
//           <div className={`passenger-details-container ${showPassenger ? 'open' : ''}`}>
//             <Passenger
//               selectedSeats={selectedSeats}
//               flight={flight}
//               passengerDetails={passengerDetails}
//               onPassengerChange={handlePassengerChange}
//             />
//           </div>
//         </>
//       ) : (
//         <div>Loading flight details...</div>
//       )}
//     </div>
//   );
// };

// export default SeatSelectionWrapper;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SeatSchema from "../seatschema/seatschema";
import Passenger from "../passenger/passenger";
import './wrappercontent.css';

const SeatSelectionWrapper = () => {
  const location = useLocation();
  const { flight } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({});
  const [showPassenger, setShowPassenger] = useState(false);

  const handleSeatClick = (row, seat) => {
    const seatId = seat;
    setSelectedSeats((prevSelected) => {
      const newSelected = prevSelected.includes(seatId)
        ? prevSelected.filter((s) => s !== seatId)
        : [...prevSelected, seatId];

      if (newSelected.length > 0) {
        setShowPassenger(true);
      } else {
        setShowPassenger(false);
      }
      return newSelected;
    });
  };

  const handlePassengerChange = (seatId, data) => {
    setPassengerDetails((prev) => ({
      ...prev,
      [seatId]: data,
    }));
  };

  return (
    <div className="seat-selection-container">
      {flight ? (
        <>
          <div className="seat-schema-container">
            <SeatSchema
              selectedSeats={selectedSeats}
              
              onSeatClick={handleSeatClick}
              flightNumber={flight.flightNumber}
              totalRows={10} // Adjustable number of rows
              seatsPerRow={6} // Adjustable seats per row (e.g., A-F)
            />
          </div>
          <div className={`passenger-details-container ${showPassenger ? 'open' : ''}`}>
            <Passenger
              selectedSeats={selectedSeats}
              flight={flight}
              passengerDetails={passengerDetails}
              onPassengerChange={handlePassengerChange}
            />
          </div>
        </>
      ) : (
        <div>Loading flight details...</div>
      )}
    </div>
  );
};

export default SeatSelectionWrapper;