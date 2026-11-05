require('dotenv').config();
const { MongoClient } = require('mongodb');

(async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('swadGrillDB');
    
    console.log("Creating database indexes...");
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('orders').createIndex({ email: 1, createdAt: -1 });
    await db.collection('products').createIndex({ category: 1 });
    
    console.log('Database indexes created successfully!');
  } catch (err) {
    console.error("Setup Error:", err);
  } finally {
    await client.close();
    process.exit(0);
  }
})();