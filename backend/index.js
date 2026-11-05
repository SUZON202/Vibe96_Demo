const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./database/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Routes Connect করা হচ্ছে
app.use('/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api', require('./routes/payments')); // /api/create-payment-intent

// ক্যাটাগরি ৪: Health check API
app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, message: "System is fully operational" });
});

app.get('/', (req, res) => {
  res.send('Swad Grill Backend Running Modularly!');
});

// Database Connect করে তারপর Server স্টার্ট করা
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running smoothly on port: ${port}`);
  });
});