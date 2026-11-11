const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { isAdminEmail } = require('../middleware/roles');
const { getDb } = require('../database/db');

// ⚠️ Orders.jsx এ যে status মানগুলো ব্যবহার হয় সেগুলো এখানে মিলিয়ে নাও
const ALLOWED_STATUS = ['pending', 'preparing', 'ready', 'delivered', 'completed', 'cancelled'];

router.get('/', verifyToken, async (req, res) => {
  try {
    const email = req.decoded.email;
    const query = (await isAdminEmail(email)) ? {} : { customerEmail: email };
    const result = await getDb().collection('orders').find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Failed to load orders' });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Invalid order id' });
    }
    const email = req.decoded.email;
    const order = await getDb().collection('orders').findOne({ _id: new ObjectId(req.params.id) });
    if (!order) return res.status(404).send({ message: 'Order not found' });

    if (order.customerEmail !== email && !(await isAdminEmail(email))) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: 'Failed to load order' });
  }
});

router.patch('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Invalid order id' });
    }
    const status = req.body.status;
    if (typeof status !== 'string' || !ALLOWED_STATUS.includes(status)) {
      return res.status(400).send({ message: 'Invalid status value' });
    }
    const result = await getDb().collection('orders').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status } }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: 'Failed to update order' });
  }
});

module.exports = router;