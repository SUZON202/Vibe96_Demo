const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB...");
    
    const db = client.db("swadGrillDB"); 

    await db.collection('users').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('orders').deleteMany({});
    await db.collection('settings').deleteMany({});

    await db.collection('users').insertOne({
      name: "Shafiq Suzon",
      email: "shafiqsuzon507@gmail.com",
      role: "admin"
    });

    await db.collection('products').insertOne({
      name: "Special Swad Burger",
      price: 15.99,
      category: "Fast Food"
    });

    await db.collection('settings').insertOne({
      restaurantName: "Swad Grill",
      currency: "BDT"
    });

    console.log("Database seeded successfully with demo data!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();