const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const stripe = require('stripe'); // উপরে শুধু প্যাকেজটা ইমপোর্ট করলাম

router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { price, email } = req.body;
    
    if (!email || email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(400).send({ error: "No Stripe Key Configured" });
    }
    
    // ভেতরে Stripe চালু করলাম, যাতে গ্যারান্টি দিয়ে .env থেকে কী (Key) পায়
    const stripeLib = stripe(process.env.STRIPE_SECRET_KEY);
    
    const paymentIntent = await stripeLib.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });
    
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;