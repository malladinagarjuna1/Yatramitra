// seatData.js

const seatMap = [
  {
    row: 51,
    seats: [
      { id: 'A', booked: false },
      { id: 'B', booked: true },
      null, // aisle
      { id: 'C', booked: false },
      { id: 'D', booked: false }
    ]
  },
  {
    row: 52,
    seats: [
      { id: 'A', booked: false },
      { id: 'B', booked: false },
      null,
      { id: 'C', booked: true },
      { id: 'D', booked: false }
    ]
  }
];

export default seatMap;
