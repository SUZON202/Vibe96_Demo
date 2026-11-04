# Setup Instructions

## 1. Prerequisites
- Node.js installed.
- MongoDB Atlas cluster ready (Get your MONGODB_URI).
- Firebase account configured for authentication keys.

## 2. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file using `.env.example` as a template and add your `MONGODB_URI`.
4. Create a new database named `swadGrillDB` in your MongoDB cluster.
5. Seed database with initial demo data: `npm run seed` (this runs database/seed.js).
6. Ensure MongoDB collections (users, products, orders, settings) are configured.
7. Start the server: `npm start`

## 3. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file for your Firebase configuration keys.
4. Start the React application: `npm run dev`