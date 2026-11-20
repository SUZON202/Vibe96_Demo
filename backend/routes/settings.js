const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { getDb } = require('../database/db');

function pickAndValidateSettings(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Request body must be a JSON object' };
  }

  const allowedKeys = [
    'restaurantName',
    'taxRate',
    'deliveryFee',
    'contactEmail',
    'contactPhone',
    'address',
    'logo',
    'currency',
    'openingTime',
    'closingTime',
  ];

  const safeData = {};

  for (const key of allowedKeys) {
    if (!Object.prototype.hasOwnProperty.call(body, key) || body[key] === undefined) {
      continue;
    }

    const value = body[key];

    if (key === 'taxRate' || key === 'deliveryFee') {
      const num = Number(value);
      if (!Number.isFinite(num) || num < 0 || num > 10000) {
        return { error: `Invalid numeric value for ${key}` };
      }
      safeData[key] = num;
    } else if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.length > 300) {
        return { error: `${key} exceeds maximum length` };
      }
      safeData[key] = trimmed;
    } else {
      return { error: `Invalid type for ${key}` };
    }
  }

  if (Object.keys(safeData).length === 0) {
    return { error: 'No valid settings fields provided' };
  }

  return { data: safeData };
}

router.get('/', async (req, res) => {
  try {
    const settings = await getDb().collection('settings').findOne({ _id: 'main' });
    res.send(settings || {});
  } catch (error) {
    res.status(500).send({ message: 'Failed', error: error.message });
  }
});

router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { data, error } = pickAndValidateSettings(req.body);

    if (error) {
      return res.status(400).send({ message: error });
    }

    const result = await getDb().collection('settings').updateOne(
      { _id: 'main' },
      { $set: data },
      { upsert: true }
    );

    res.send({ success: true, result });
  } catch (error) {
    res.status(500).send({ message: 'Failed', error: error.message });
  }
});

module.exports = router;