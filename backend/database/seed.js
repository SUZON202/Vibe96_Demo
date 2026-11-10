// Inserts demo data. Safe to run multiple times. Run after: npm run db:setup
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "swadGrillDB";

const products = [
  { name: "Butter Chicken", category: "Main Course", price: 14.99, description: "Creamy tomato curry with tender chicken.", image: "", available: true },
  { name: "Paneer Tikka", category: "Starters", price: 9.99, description: "Grilled cottage cheese with spices.", image: "", available: true },
  { name: "Garlic Naan", category: "Breads", price: 3.49, description: "Soft naan topped with garlic and butter.", image: "", available: true },
  { name: "Mango Lassi", category: "Drinks", price: 4.5, description: "Chilled yogurt drink with mango.", image: "", available: true },
];

const users = [
  { email: "demo@example.com", name: "Demo Admin", role: "admin" },
];

const settings = [
  { key: "restaurant", name: "Swad Grill", currency: "USD", openingHours: "11:00 - 22:00" },
];

async function upsertMany(col, docs, keyField, extra = {}) {
  for (const doc of docs) {
    await col.updateOne(
      { [keyField]: doc[keyField] },
      { $set: doc, $setOnInsert: extra },
      { upsert: true }
    );
  }
}

async function run() {
  if (!uri) throw new Error("MONGODB_URI is missing in .env");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await upsertMany(db.collection("products"), products, "name");
    await upsertMany(db.collection("users"), users, "email", { createdAt: new Date() });
    await upsertMany(db.collection("settings"), settings, "key");

    console.log(`Seed complete in "${dbName}": products, users, settings ready.`);
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});