const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15' // Use stable version
});

router.post('/create-checkout-session', async (req, res) => {
  try {
  const session = await stripe.checkout.sessions.create({
  line_items: [{
    price_data: {
      currency: 'inr',
      product_data: { name: 'Flight Ticket' },
unit_amount: Math.round(100 * 100) // Ensure integer value
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: 'http://localhost:5173/success',
  cancel_url: 'http://localhost:5173/cancel',
  customer_email: req.body.email || 'customer@example.com',
 
});

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Payment failed' });
  }
});

// Add webhook handling for asynchronous events
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
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

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // Fulfill the order
    console.log('Payment succeeded:', paymentIntent.id);
  }

  res.json({received: true});
});

module.exports = router;
