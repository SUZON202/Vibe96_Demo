const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { getDb } = require('../database/db');

// ক্যাটাগরি ২: POST রিকোয়েস্টে Role 'user' ফিক্স করে দেওয়া হয়েছে
router.post('/', verifyToken, async (req, res) => {
  const { name, email, photoURL } = req.body; 
  
  if (req.decoded.email !== email) {
    return res.status(403).send({ message: 'Forbidden access' });
  }
  
  const usersCollection = getDb().collection("users");
  const existingUser = await usersCollection.findOne({ email: email });
  if (existingUser) {
    return res.send({ message: 'User already exists', insertedId: null });
  }

  // সব নতুন ইউজার ডিফল্টভাবে 'user' হবে। Admin বানাতে হলে ডাটাবেস থেকে ম্যানুয়ালি বা Admin প্যানেল থেকে করতে হবে।
  const newUser = { name, email, photoURL, role: 'user', createdAt: new Date() };
  const result = await usersCollection.insertOne(newUser);
  res.send(result);
});

router.get('/role/:email', verifyToken, async (req, res) => {
  const email = req.params.email;
  const requesterEmail = req.decoded.email;
  const usersCollection = getDb().collection("users");

  const requester = await usersCollection.findOne({ email: requesterEmail });
  const isAdmin = requester?.role === 'main_admin' || requester?.role === 'sub_admin';

  if (!isAdmin && requesterEmail !== email) {
    return res.status(403).send({ message: 'Forbidden access' });
  }

  const user = await usersCollection.findOne({ email: email });
  res.send({ role: user?.role || 'user' });
});

module.exports = router;