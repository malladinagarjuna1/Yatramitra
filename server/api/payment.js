// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2022-11-15' 
// });
// const Booking = require('../models/booking');


//   router.post('/create-checkout-session', async (req, res) => {
//     const { amount, passengers, email, flightNumber, seatNumbers, from, to, departure, arrival } = req.body;

//     try {
//       const session = await stripe.checkout.sessions.create({
//         line_items: [{
//           price_data: {
//             currency: 'inr',
//             product_data: { name: 'Flight Ticket' },
//             unit_amount: Math.round(amount * 100), 
//           },
//           quantity: passengers,
//         }],
//         mode: 'payment',
//         success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}&flightNumber=${encodeURIComponent(flightNumber)}&seatNumbers=${encodeURIComponent(seatNumbers.join(','))}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&departure=${encodeURIComponent(departure)}&arrival=${encodeURIComponent(arrival)}`,
//         cancel_url: 'http://localhost:5173/cancel',
//         customer_email: email || 'customer@example.com',
//         metadata: {
//           flightNumber,
//           seatNumbers: seatNumbers.join(','),
//           from,
//           to,
//           departure,
//           arrival
//         }
//       });

//       res.json({ url: session.url });
//     } catch (err) {
//       console.error('Stripe error:', err);
//       res.status(500).json({ error: 'Payment failed' });
//     }
//   });

// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//   const signature = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//   const session = event.data.object;

//   // Metadata contains your flight info you passed when creating the session
//   const metadata = session.metadata;

//   // Example metadata keys: flightNumber, seatNumbers, from, to, departure, arrival
//   const flightDetails = {
//     flightNumber: metadata.flightNumber,
//     seatNumbers: metadata.seatNumbers,   // usually a comma-separated string
//     from: metadata.from,
//     to: metadata.to,
//     departure: metadata.departure,
//     arrival: metadata.arrival
//   };

//   // Pass these details to generate the PDF
//   const pdfBuffer = await generateTicketPDF(flightDetails);

//   // Send the email with the PDF attached
//   await sendEmailWithPDF(session.customer_email, pdfBuffer);}
//   res.json({ received: true });
// });


// // router.get('/payment/verify', async (req, res) => {
// //   const { session_id } = req.query;

// //   if (!session_id) {
// //     return res.status(400).json ({ success: false, message: 'Missing session_id' });
// //   }

// //   try {
// //     const session = await stripe.checkout.sessions.retrieve(session_id);

// //     if (session.payment_status !== 'paid') {
// //       return res.json({ success: false, message: 'Payment not completed' });
// //     }

// //     const booking = await Booking.create({
// //       flightNumber: session.metadata.flightNumber,
// //       seatNumbers: session.metadata.seatNumbers.split(','),
// //       from: session.metadata.from,
// //       to: session.metadata.to,
// //       departure: session.metadata.departure,
// //       arrival: session.metadata.arrival,
// //       passengerName: session.customer_details.name || 'Unknown Passenger'
// //     });

// //     const ticketURL = await generatePDFTicket(booking);

// //     return res.json({ success: true, ticketURL });
// //   } catch (err) {
// //     console.error('Verification error:', err);
// //     return res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });
// // router.get('/payment/verify', async (req, res) => {
// //   try {
// //     const { session_id } = req.query;
// //     console.log('Verifying payment for session:', session_id);

// //     const session = await stripe.checkout.sessions.retrieve(session_id, {
// //       expand: ['line_items']
// //     });

// //     console.log('Stripe session retrieved:', session);

// //     res.json({ success: true, booking: session.metadata, ticketURL: '...' });

// //   } catch (err) {
// //     console.error('Payment verification error:', err); // Log the actual Stripe error
// //     res.status(500).json({ success: false, message: 'Server error verifying payment.' });
// //   }
// // });
// router.get('/payment/verify', async (req, res) => {
//   try {
//     const { session_id } = req.query;

//     const session = await stripe.checkout.sessions.retrieve(session_id);


//     const ticketURL = `http://localhost:5000/tickets/${session.metadata.flightNumber}.pdf`;

//     res.json({
//       success: true,
//       booking: {
//         flightNumber: session.metadata.flightNumber,
//         seatNumbers: session.metadata.seatNumbers,
//         from: session.metadata.from,
//         to: session.metadata.to,
//         departure: session.metadata.departure,
//         arrival: session.metadata.arrival
//       },
//       ticketURL
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error verifying payment.' });
//   }
// });


// module.exports = router;
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
});
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit'); // for PDF generation
const Booking = require('../models/booking');

// Utility: Generate PDF in memory
function generateTicketPDF(flightDetails) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(22).text('Flight Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Flight Number: ${flightDetails.flightNumber}`);
    doc.text(`From: ${flightDetails.from}`);
    doc.text(`To: ${flightDetails.to}`);
    doc.text(`Departure: ${flightDetails.departure}`);
    doc.text(`Arrival: ${flightDetails.arrival}`);
    doc.text(`Seats: ${flightDetails.seatNumbers}`);
    doc.end();
  });
}

// Utility: Send email with PDF attachment
async function sendEmailWithPDF(toEmail, pdfBuffer, flightNumber) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS  // App password or email password
    }
  });

  await transporter.sendMail({
    from: `"Flight Booking" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Your Flight Ticket - ${flightNumber}`,
    html: `
      <h2>Your Flight Ticket</h2>
      <p>Thank you for booking with us. Please find your ticket attached.</p>
      <p>We wish you a pleasant journey ✈️</p>
    `,
    attachments: [
      {
        filename: `Ticket-${flightNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  });
}

router.post('/create-checkout-session', async (req, res) => {
  const { amount, passengers, email, flightNumber, seatNumbers, from, to, departure, arrival } = req.body;
  console.log(req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: 'Flight Ticket' },
          unit_amount: Math.round(amount * 100),
        },
        quantity: passengers,
      }],
      mode: 'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'http://localhost:5173/cancel',
      customer_email: email || 'customer@example.com',
      metadata: {
        flightNumber,
        seatNumbers: seatNumbers.join(','),
        from,
        to,
        departure,
        arrival
      }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Payment failed' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const flightDetails = {
      flightNumber: session.metadata.flightNumber,
      seatNumbers: session.metadata.seatNumbers,
      from: session.metadata.from,
      to: session.metadata.to,
      departure: session.metadata.departure,
      arrival: session.metadata.arrival
    };

    try {
      const pdfBuffer = await generateTicketPDF(flightDetails);
      await sendEmailWithPDF(session.customer_email, pdfBuffer, session.metadata.flightNumber);
      console.log(`Ticket sent to ${session.customer_email}`);
    } catch (err) {
      console.error('Error generating/sending ticket:', err);
    }
  }

  res.json({ received: true });
});

router.get('/payment/verify', async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const ticketURL = `http://localhost:5000/tickets/${session.metadata.flightNumber}.pdf`;

    res.json({
      success: true,
      booking: {
        flightNumber: session.metadata.flightNumber,
        seatNumbers: session.metadata.seatNumbers,
        from: session.metadata.from,
        to: session.metadata.to,
        departure: session.metadata.departure,
        arrival: session.metadata.arrival
      },
      ticketURL
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error verifying payment.' });
  }
});

module.exports = router;
