const express = require('express');
const router = express.Router();
const getPassengerModel = require('../models/passenger');
const nodemailer = require("nodemailer");
const QRCode = require('qrcode');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const path = require('path');


router.post('/passengerdetails', async (req, res) => {
    try {
        const Passenger = getPassengerModel();
        const { firstandMiddleName, LastName, Dateofbirth } = req.body;

        if (!firstandMiddleName || !LastName || !Dateofbirth) {
            return res.status(400).json({
                status: "failed",
                message: "All fields are required"
            });
        }

        const newUser = new Passenger({
            firstandMiddleName: firstandMiddleName,
            LastName,
            Dateofbirth: new Date(Dateofbirth)
        });

        const result = await newUser.save();
        res.json({
            status: "SUCCESS",
            message: "Passenger details saved",
            data: result,
        });
    } catch (err) {
        console.error("Error saving passenger:", err);
        res.status(500).json({
            status: "failed",
            message: "Database error",
            error: err.message
        });
    }
    transporter.sendMail(mailOptions);
});


router.get('/api/generate-ticket', async (req, res) => {
  const { bookingId } = req.query;

  // Fetch booking details from DB using bookingId
  const booking = await Booking.findById(bookingId);

  const doc = new PDFDocument();
  const filename = `ticket-${bookingId}.pdf`;
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

  res.json({ ticketURL: `http://localhost:5000/tickets/${filename}` });
});

module.exports = router;