const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      })
    });
  }
} catch (error) {
  console.log("Firebase init error:", error.message);
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.decoded = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send({ message: 'Forbidden access' });
  }
};

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

let usersCollection, productsCollection, ordersCollection, settingsCollection;

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const isEmailVerified = req.decoded.email_verified; 

    if (!isEmailVerified) {
      return res.status(403).send({ message: 'Forbidden access: Email not verified' });
    }

    if (email === process.env.MAIN_ADMIN_EMAIL || email === process.env.SUB_ADMIN_EMAIL) {
      return next();
    }
    const query = { email: email };
    const user = await usersCollection.findOne(query);
    
    if (user?.role !== 'main_admin' && user?.role !== 'sub_admin') {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    next();
  } catch (error) {
    return res.status(403).send({ message: 'Forbidden access' });
  }
};

app.post('/users', verifyToken, async (req, res) => {
  const { name, email, photoURL } = req.body; 
  const isEmailVerified = req.decoded.email_verified; 

  if (req.decoded.email !== email) {
    return res.status(403).send({ message: 'Forbidden access' });
  }
  
  const query = { email: email };
  const existingUser = await usersCollection.findOne(query);
  if (existingUser) {
    return res.send({ message: 'User already exists', insertedId: null });
  }

  let assignedRole = 'user';
  
  if (isEmailVerified) {
    if (email === process.env.MAIN_ADMIN_EMAIL) {
      assignedRole = 'main_admin';
    } else if (email === process.env.SUB_ADMIN_EMAIL) {
      assignedRole = 'sub_admin';
    }
  }
  
  const newUser = { name, email, photoURL, role: assignedRole };
  const result = await usersCollection.insertOne(newUser);
  res.send(result);
});

app.get('/users/role/:email', verifyToken, async (req, res) => {
  const email = req.params.email;
  const requesterEmail = req.decoded.email;
  const requester = await usersCollection.findOne({ email: requesterEmail });
  const isAdmin = requester?.role === 'main_admin' || requester?.role === 'sub_admin';

  if (!isAdmin && requesterEmail !== email) {
    return res.status(403).send({ message: 'Forbidden access' });
  }

  const user = await usersCollection.findOne({ email: email });
  res.send({ role: user?.role || 'user' });
});

app.post('/api/products', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = req.body;
    const result = await productsCollection.insertOne(product);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await productsCollection.find({}).toArray();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.delete('/api/products/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productsCollection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.put('/api/products/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = req.body;
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedProduct }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.get('/api/orders', verifyToken, async (req, res) => {
  try {
    const callerEmail = req.decoded.email;
    const caller = await usersCollection.findOne({ email: callerEmail });
    
    let filter = {}; 
    if (caller?.role !== 'main_admin' && caller?.role !== 'sub_admin') {
      if (req.query.email && req.query.email !== callerEmail) {
        return res.status(403).send({ message: 'Forbidden access' });
      }
      filter = { email: callerEmail }; 
    } else if (req.query.email) {
      filter = { email: req.query.email };
    }

    const orders = await ordersCollection.find(filter).toArray();
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.post('/api/orders', verifyToken, async (req, res) => {
  try {
    const newOrder = req.body;
    if (!newOrder.email || newOrder.email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const result = await ordersCollection.insertOne(newOrder);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.patch('/api/orders/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.get('/api/settings', async (req, res) => {
  try {
    const settings = await settingsCollection.findOne({});
    res.send(settings || {});
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.post('/api/settings', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedSettings = req.body;
    const result = await settingsCollection.updateOne(
      {},
      { $set: updatedSettings },
      { upsert: true }
    );
    res.send({ success: true, result });
  } catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
});

app.post('/api/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { price, email } = req.body;
    if (!email || email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(400).send({ error: "No Stripe Key" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("swadGrillDB");
    usersCollection = db.collection("users");
    productsCollection = db.collection("products"); 
    ordersCollection = db.collection("orders"); 
    settingsCollection = db.collection("settings"); 
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Error connecting: ", error);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Swad Grill Backend Running!');
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});