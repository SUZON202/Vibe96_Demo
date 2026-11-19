const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getDb } = require('../database/db');
const stripe = require('stripe');

router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { items, email } = req.body; // ক্লায়েন্ট থেকে শুধু কার্ট আইটেম বা প্রোডাক্ট আইডি পাঠানো হবে
    
    if (!email || email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(400).send({ error: "No Stripe Key Configured" });
    }

    // Vibe96 Requirement: Compute price server-side from database products, never trust client-supplied price
    let calculatedAmount = 0;
    const db = getDb();

    if (items && Array.isArray(items) && items.length > 0) {
      for (const cartItem of items) {
        // ডেটাবেস থেকে রিয়েল প্রোডাক্টের দাম বের করা হচ্ছে
        const product = await db.collection("products").findOne({ _id: cartItem._id || cartItem.id });
        if (product) {
          calculatedAmount += product.price * (cartItem.quantity || 1);
        }
      }
    }

    // যদি কোনো কারণে ডেটাবেস থেকে দাম পাওয়া না যায় বা অ্যামাউন্ট শূন্য/নেগেটিভ হয়
    if (!calculatedAmount || calculatedAmount <= 0) {
      return res.status(400).send({ error: "Invalid payment amount or empty cart items." });
    }
    
    // Stripe চালু করা
    const stripeLib = stripe(process.env.STRIPE_SECRET_KEY);
    
    const paymentIntent = await stripeLib.paymentIntents.create({
      amount: Math.round(calculatedAmount * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });
    
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;