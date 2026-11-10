// Creates database indexes. Run once: npm run db:setup
require("dotenv").config();
const { MongoClient } = require("mongodb");

const dbName = process.env.DB_NAME || "swadGrillDB";

(async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing in .env");
    process.exit(1);
  }
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(dbName);

    console.log(`Creating indexes in database "${dbName}"...`);
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("orders").createIndex({ email: 1, createdAt: -1 });
    await db.collection("payments").createIndex({ email: 1 });
    await db.collection("products").createIndex({ category: 1 });
    await db.collection("products").createIndex({ name: 1 }, { unique: true });
    await db.collection("settings").createIndex({ key: 1 }, { unique: true });

    console.log("Database indexes created successfully!");
  } catch (err) {
    console.error("Setup Error:", err.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
})();