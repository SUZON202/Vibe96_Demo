const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { getDb } = require('../database/db');

// ⚠️ AddProduct.jsx এ যে field গুলো পাঠানো হয় সেগুলো এখানে মিলিয়ে নাও
const pickProductFields = (body) => {
  const out = {};
  if (typeof body.name === 'string') out.name = body.name.trim();
  if (typeof body.category === 'string') out.category = body.category.trim();
  if (typeof body.description === 'string') out.description = body.description.trim();
  if (typeof body.image === 'string') out.image = body.image.trim();
  if (body.price !== undefined && !Number.isNaN(Number(body.price))) out.price = Number(body.price);
  if (typeof body.available === 'boolean') out.available = body.available;
  return out;
};

const validId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: 'Invalid product id' });
  }
  next();
};

router.get('/', async (req, res) => {
  try {
    res.send(await getDb().collection('products').find({}).toArray());
  } catch (error) {
    res.status(500).send({ message: 'Failed to load products' });
  }
});

router.get('/:id', validId, async (req, res) => {
  try {
    res.send(await getDb().collection('products').findOne({ _id: new ObjectId(req.params.id) }));
  } catch (error) {
    res.status(500).send({ message: 'Failed to load product' });
  }
});

router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const doc = pickProductFields(req.body);
    if (!doc.name || doc.price === undefined) {
      return res.status(400).send({ message: 'name and price are required' });
    }
    res.send(await getDb().collection('products').insertOne(doc));
  } catch (error) {
    res.status(500).send({ message: 'Failed to add product' });
  }
});

router.put('/:id', verifyToken, verifyAdmin, validId, async (req, res) => {
  try {
    const doc = pickProductFields(req.body);
    if (Object.keys(doc).length === 0) {
      return res.status(400).send({ message: 'No valid fields to update' });
    }
    res.send(await getDb().collection('products').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: doc }
    ));
  } catch (error) {
    res.status(500).send({ message: 'Failed to update product' });
  }
});

router.delete('/:id', verifyToken, verifyAdmin, validId, async (req, res) => {
  try {
    res.send(await getDb().collection('products').deleteOne({ _id: new ObjectId(req.params.id) }));
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete product' });
  }
});

module.exports = router;