const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connecting to the database
    await client.connect();
    
    // Creating database and collections 
    const db = client.db("swadGrillDB");
    const usersCollection = db.collection("users");
    const productsCollection = db.collection("products"); 
    const ordersCollection = db.collection("orders"); 
    const settingsCollection = db.collection("settings"); // Settings collection

    // ==========================================
    // RBAC API: User Data and Role Management 
    // ==========================================

    // 1. API to save user data after login or sign-up from Firebase
    app.post('/users', async (req, res) => {
      const user = req.body;
      
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      
      if (existingUser) {
        return res.send({ message: 'User already exists', insertedId: null });
      }
      
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // 2. API to check user role
    app.get('/users/role/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      
      let userRole = 'user';
      if (user && user.role) {
        userRole = user.role;
      }
      
      res.send({ role: userRole });
    });

    // ==========================================
    // Products API: Product Management
    // ==========================================

    // 3. API to save new product to database (POST) - DISABLED FOR DEMO
    app.post('/api/products', async (req, res) => {
      try {
        // ডেমোর জন্য নতুন প্রোডাক্ট এড করা বন্ধ রাখা হলো
        // const product = req.body;
        // const result = await productsCollection.insertOne(product);
        // res.send(result);
        
        res.send({ acknowledged: true, insertedId: null, message: "Action disabled in Live Demo." });
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send({ message: "Failed to add product", error: error.message });
      }
    });

    // 4. API to fetch all products from database to frontend (GET)
    app.get('/api/products', async (req, res) => {
      try {
        const products = await productsCollection.find({}).toArray();
        res.send(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ message: "Failed to fetch products", error: error.message });
      }
    });

    // 5. API to delete product (DELETE) - DISABLED FOR DEMO
    app.delete('/api/products/:id', async (req, res) => {
      try {
        // ডেমোর জন্য প্রোডাক্ট ডিলিট করা বন্ধ রাখা হলো
        // const id = req.params.id;
        // const query = { _id: new ObjectId(id) };
        // const result = await productsCollection.deleteOne(query);
        // res.send(result);

        res.send({ deletedCount: 0, message: "Action disabled in Live Demo." });
      } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ message: "Failed to delete product", error: error.message });
      }
    });

    // 6. API to fetch data of a specific product (GET Single Product)
    app.get('/api/products/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productsCollection.findOne(query);
        res.send(result);
      } catch (error) {
        console.error("Error fetching single product:", error);
        res.status(500).send({ message: "Failed to fetch single product", error: error.message });
      }
    });

    // 7. API to update product (PUT) - DISABLED FOR DEMO
    app.put('/api/products/:id', async (req, res) => {
      try {
        // ডেমোর জন্য প্রোডাক্ট আপডেট করা বন্ধ রাখা হলো
        // const id = req.params.id;
        // const filter = { _id: new ObjectId(id) };
        // const updatedProduct = req.body;
        // const updateDoc = {
        //   $set: {
        //     name: updatedProduct.name,
        //     price: updatedProduct.price,
        //     category: updatedProduct.category,
        //     image: updatedProduct.image,
        //     description: updatedProduct.description,
        //   },
        // };
        // const result = await productsCollection.updateOne(filter, updateDoc);
        // res.send(result);

        res.send({ modifiedCount: 0, message: "Action disabled in Live Demo." });
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ message: "Failed to update product", error: error.message });
      }
    });

    // ==========================================
    // Orders API: Order Management
    // ==========================================

    // 8. API to fetch all orders from database to frontend (GET) 
    app.get('/api/orders', async (req, res) => {
      try {
        const orders = await ordersCollection.find({}).toArray();
        res.send(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ message: "Failed to fetch orders", error: error.message });
      }
    });

    // 9. API to place new order (POST)
    app.post('/api/orders', async (req, res) => {
      try {
        const newOrder = req.body;
        const result = await ordersCollection.insertOne(newOrder);
        res.send(result);
      } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).send({ message: "Failed to place order", error: error.message });
      }
    });

    // 10. API to update order status (PATCH)
    app.patch('/api/orders/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const { status } = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { status: status },
        };
        const result = await ordersCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).send({ message: "Failed to update order status", error: error.message });
      }
    });

    // ==========================================
    // Settings & Stripe Payment API 
    // ==========================================

    // 11. API to fetch settings from database (GET)
    app.get('/api/settings', async (req, res) => {
      try {
        const settings = await settingsCollection.findOne({});
        res.send(settings || {});
      } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).send({ message: "Failed to fetch settings", error: error.message });
      }
    });

    // 12. API to save or update settings and Stripe Keys (POST) - DISABLED FOR DEMO
    app.post('/api/settings', async (req, res) => {
      try {
        // ডেমোর জন্য সেটিংস এবং স্ট্রাইপ কি পরিবর্তন বন্ধ রাখা হলো
        // const updatedSettings = req.body;
        // const result = await settingsCollection.updateOne(
        //   {},
        //   { $set: updatedSettings },
        //   { upsert: true }
        // );
        // res.send({ success: true, message: "Settings updated successfully!", result });

        res.send({ success: false, message: "Settings change is disabled in Live Demo." });
      } catch (error) {
        console.error("Error saving settings:", error);
        res.status(500).send({ message: "Failed to save settings", error: error.message });
      }
    });

    // 13. Dynamic Stripe Payment Intent API (POST)
    app.post('/api/create-payment-intent', async (req, res) => {
      try {
        const { price } = req.body;
        
        const settings = await settingsCollection.findOne({});
        if (!settings || !settings.stripeSecretKey) {
          return res.status(400).send({ error: "Stripe Secret Key is not configured in settings yet." });
        }

        const stripe = require('stripe')(settings.stripeSecretKey);
        const amount = Math.round(price * 100);

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'usd',
          payment_method_types: ['card'],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: error.message });
      }
    });

    // ==========================================

    // Sending a ping to check the connection
    await client.db("admin").command({ ping: 1 });
    console.log("Awesome! Your project has successfully connected with MongoDB!");

  } catch (error) {
    console.log("Error connecting: ", error);
  }
}
run().catch(console.dir);

// Basic route
app.get('/', (req, res) => {
    res.send('Swad Grill Backend & Database are Running Perfectly!');
});

app.listen(port, () => {
    console.log(`Swad Grill server is running on port: ${port}`);
});