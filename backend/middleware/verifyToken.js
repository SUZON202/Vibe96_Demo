const admin = require('firebase-admin');

// Firebase Admin ইনিশিয়ালাইজ করা
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
    });
}

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    
    // অডিটের নিয়ম অনুযায়ী req.user এবং আপনার আগের কোড ঠিক রাখতে req.decoded দুটোই সেট করে দিলাম
    req.user = { uid: decoded.uid, email: decoded.email };
    req.decoded = { uid: decoded.uid, email: decoded.email };
    
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;