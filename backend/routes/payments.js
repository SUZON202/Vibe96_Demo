const express = require('express');
const { ObjectId } = require('mongodb');
const Stripe = require('stripe');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getDb } = require('../database/db');

const MAX_ITEM_QUANTITY = 100;

router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { items, email } = req.body;

    if (!email || typeof email !== 'string' || email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(400).send({ error: 'No Stripe Key Configured' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).send({ error: 'Cart items must be a non-empty array' });
    }

    const normalizedItems = [];
    const objectIds = [];

    for (const cartItem of items) {
      const id = cartItem?._id ?? cartItem?.id ?? cartItem?.productId;
      const quantity = cartItem?.quantity;

      if (typeof id !== 'string' || !ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid product id' });
      }

      // quantity অবশ্যই positive integer এবং সর্বোচ্চ সীমা (1..MAX_ITEM_QUANTITY) যাচাই করা হচ্ছে
      if (!Number.isInteger(quantity) || quantity <= 0 || quantity > MAX_ITEM_QUANTITY) {
        return res.status(400).send({
          error: `Quantity must be a positive integer between 1 and ${MAX_ITEM_QUANTITY}`,
        });
      }

      const objectId = new ObjectId(id);
      normalizedItems.push({ objectId, key: objectId.toHexString(), quantity });
      objectIds.push(objectId);
    }

    const db = getDb();
    const products = await db
      .collection('products')
      .find({ _id: { $in: objectIds } })
      .toArray();

    const priceMap = new Map();
    for (const product of products) {
      const numericPrice = Number(product.price);
      if (Number.isFinite(numericPrice) && numericPrice > 0) {
        priceMap.set(product._id.toHexString(), numericPrice);
      }
    }

    let calculatedAmount = 0;
    for (const item of normalizedItems) {
      const unitPrice = priceMap.get(item.key);
      if (unitPrice === undefined) {
        return res.status(400).send({ error: `Product not found or invalid price: ${item.key}` });
      }
      calculatedAmount += unitPrice * item.quantity;
    }

    const amountInCents = Math.round(calculatedAmount * 100);
    if (!Number.isSafeInteger(amountInCents) || amountInCents <= 0) {
      return res.status(400).send({ error: 'Invalid calculated payment amount' });
    }

    // new Stripe(key) সঠিকভাবে ইনস্ট্যান্স তৈরি করা হচ্ছে
    const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;