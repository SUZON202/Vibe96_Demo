const { getDb } = require('../database/db');

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const isEmailVerified = req.decoded.email_verified; 

    if (!isEmailVerified) {
      return res.status(403).send({ message: 'Forbidden access: Email not verified' });
    }

    const usersCollection = getDb().collection("users");
    const user = await usersCollection.findOne({ email: email });
    
    // হার্ডকোডেড .env বাইপাস সরিয়ে ডাটাবেস থেকে role চেক করা হচ্ছে
    if (user?.role !== 'main_admin' && user?.role !== 'sub_admin') {
      return res.status(403).send({ message: 'Forbidden access: Admins only' });
    }
    next();
  } catch (error) {
    return res.status(403).send({ message: 'Forbidden access' });
  }
};

module.exports = verifyAdmin;