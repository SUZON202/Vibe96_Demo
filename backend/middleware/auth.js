// File: backend/middleware/auth.js
const admin = require('firebase-admin');
const { getDB } = require('../database/db'); // আপনার db.js এর পাথ অনুযায়ী মেলাবেন

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { uid: decodedToken.uid, email: decodedToken.email };

    // ডেটাবেস থেকে আসল role বের করা (Security Fix)
    const db = getDB();
    const userInDb = await db.collection('users').findOne({ uid: decodedToken.uid });
    req.user.role = userInDb?.role || 'user'; // ডিফল্ট 'user'

    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };