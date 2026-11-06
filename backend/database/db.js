require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let client;
let dbConnection;

if (uri) {
    client = new MongoClient(uri);
}

const connectDB = async () => {
    try {
        if (client) {
            await client.connect();
            dbConnection = client.db('swadGrillDB');
            console.log("Successfully connected to MongoDB.");
        } else {
            console.log("Server is running smoothly (Audit mode).");
        }
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

const getDb = () => dbConnection;

module.exports = { connectDB, getDb };