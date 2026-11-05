# Setup Instructions

## 1. Prerequisites
- Node.js installed.
- MongoDB Atlas cluster ready (Get your MONGODB_URI).
- Firebase account configured for authentication keys.
- Stripe account configured for payment keys.

## 2. Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file using `.env.example` as a template and configure your `MONGODB_URI` and other keys.
4. **MongoDB Setup & Seeding:** Ensure your MongoDB database is created. Then, run `node database/seed.js` (or `npm run seed`) to create collections and populate the database with initial demo data.
5. Start the backend server: `npm start`

## 3. Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file using `.env.example` as a template and add your Firebase keys and `VITE_API_URL`.
4. Start the React application: `npm run dev`

**Note regarding database:** This project strictly uses MongoDB as the real stack. Any `schema.sql` or `seed.sql` files found in the database folder are unused placeholders and should be ignored.