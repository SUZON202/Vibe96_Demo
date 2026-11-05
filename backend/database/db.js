const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("swadGrillDB");
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};

const getDb = () => db;

module.exports = { connectDB, getDb, client };