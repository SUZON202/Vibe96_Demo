const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { connectDB } = require('./database/db');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = (
  process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

app.use(express.json({ limit: '1mb' }));
app.use('/api', apiLimiter);

// Routes
app.use('/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api', require('./routes/payments')); // /api/create-payment-intent

app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, message: 'System is fully operational' });
});

app.get('/', (req, res) => {
  res.send('Swad Grill Backend Running');
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});