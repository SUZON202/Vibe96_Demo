const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { getDb } = require('../database/db');

router.get('/', verifyToken, async (req, res) => {
  try {
    const callerEmail = req.decoded.email;
    const usersCollection = getDb().collection("users");
    const caller = await usersCollection.findOne({ email: callerEmail });
    
    let filter = {}; 
    if (caller?.role !== 'main_admin' && caller?.role !== 'sub_admin') {
      if (req.query.email && req.query.email !== callerEmail) {
        return res.status(403).send({ message: 'Forbidden access' });
      }
      filter = { email: callerEmail }; 
    } else if (req.query.email) {
      filter = { email: req.query.email };
    }

    const orders = await getDb().collection("orders").find(filter).toArray();
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

// ক্যাটাগরি ২: নির্দিষ্ট অর্ডারের মালিকানা যাচাই (অডিট রিকোয়ারমেন্ট)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await getDb().collection("orders").findOne({ _id: new ObjectId(req.params.id) });
    if (!order) return res.status(404).send({ message: 'Order not found' });

    const callerEmail = req.decoded.email;
    const caller = await getDb().collection("users").findOne({ email: callerEmail });
    const isAdmin = caller?.role === 'main_admin' || caller?.role === 'sub_admin';

    if (order.email !== callerEmail && !isAdmin) {
      return res.status(403).send({ message: 'Forbidden: This is not your order' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const newOrder = { ...req.body, createdAt: new Date() };
    if (!newOrder.email || newOrder.email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const result = await getDb().collection("orders").insertOne(newOrder);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

router.patch('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await getDb().collection("orders").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: req.body.status } }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

module.exports = router;