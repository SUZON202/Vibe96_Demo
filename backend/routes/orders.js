const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { getDb } = require('../database/db');

// ইউজার শুধু নিজের অর্ডার দেখবে, অ্যাডমিন সবারটা দেখবে
router.get('/', verifyToken, async (req, res) => {
  const email = req.decoded.email;
  const usersCollection = getDb().collection("users");
  const requester = await usersCollection.findOne({ email: email });

  const query = {};
  if (requester?.role !== 'main_admin' && requester?.role !== 'sub_admin') {
    query.customerEmail = email; // সাধারণ ইউজারের জন্য ফিল্টার
  }

  const ordersCollection = getDb().collection("orders");
  const result = await ordersCollection.find(query).toArray();
  res.send(result);
});

// নির্দিষ্ট একটি অর্ডার দেখা (অন্যের অর্ডার দেখা বন্ধ)
router.get('/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  const email = req.decoded.email;
  
  const usersCollection = getDb().collection("users");
  const requester = await usersCollection.findOne({ email: email });
  const isAdmin = requester?.role === 'main_admin' || requester?.role === 'sub_admin';

  const ordersCollection = getDb().collection("orders");
  const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

  if (!order) return res.status(404).send({ message: 'Order not found' });

  // ইউজার যদি অর্ডারের মালিক না হয় এবং অ্যাডমিন না হয়, তবে এক্সেস ডিনাই!
  if (order.customerEmail !== email && !isAdmin) {
    return res.status(403).send({ message: 'Forbidden access' });
  }

  res.send(order);
});

// অর্ডার আপডেট করা (শুধু অ্যাডমিন পারবে)
router.patch('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      status: req.body.status
    }
  };
  const ordersCollection = getDb().collection("orders");
  const result = await ordersCollection.updateOne(filter, updatedDoc);
  res.send(result);
});

module.exports = router;