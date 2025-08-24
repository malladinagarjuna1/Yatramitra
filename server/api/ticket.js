const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


async function generatePDFTicket(booking) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filename = `ticket-${booking._id}.pdf`;
    const filePath = path.join(__dirname, 'tickets', filename);

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text('Flight Ticket', { align: 'center' });
    doc.moveDown();
    doc.text(`Flight: ${booking.flightNumber}`);
    doc.text(`Passenger: ${booking.passengerName}`);
    doc.text(`Seats: ${booking.seatNumbers.join(', ')}`);
    doc.text(`From: ${booking.from} ➡️ To: ${booking.to}`);
    doc.text(`Departure: ${booking.departure}`);
    doc.text(`Arrival: ${booking.arrival}`);

    doc.end();

    doc.on('finish', () => {
      resolve(`http://localhost:5000/tickets/${filename}`);
    });

    doc.on('error', reject);
  });
}

module.exports = generatePDFTicket;
