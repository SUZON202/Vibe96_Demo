const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { getDb } = require('../database/db');

router.get('/', async (req, res) => {
  try {
    const products = await getDb().collection("products").find({}).toArray();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await getDb().collection("products").findOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await getDb().collection("products").insertOne(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await getDb().collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await getDb().collection("products").deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

module.exports = router;