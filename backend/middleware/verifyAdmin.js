const { getDb } = require('../database/db');

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const usersCollection = getDb().collection("users");
  
  // ডেটাবেস থেকে আসল ইউজারের তথ্য বের করা হচ্ছে (Client-এর উপর ভরসা না করে)
  const user = await usersCollection.findOne({ email: email });
  
  const isAdmin = user?.role === 'main_admin' || user?.role === 'sub_admin';
  
  if (!isAdmin) {
    return res.status(403).send({ message: 'Forbidden access: Admins only' });
  }
  
  next();
};

module.exports = verifyAdmin;