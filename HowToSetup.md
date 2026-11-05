# Setup Instructions

## 1. Prerequisites
- Node.js (v20.10.0 or higher) installed.
- MongoDB Atlas cluster ready (Get your MONGODB_URI).
- Firebase account configured for authentication keys.
- Stripe account configured for payment keys.

## 2. Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file using `.env.example` as a template and configure your `MONGODB_URI` and other keys.
4. **MongoDB Setup & Indexing:** Run the following command to automatically create the necessary database indexes:
   \`\`\`bash
   npm run db:setup
   \`\`\`
5. **Database Seeding:** Run `node database/seed.js` (or `npm run seed`) to populate the database with initial demo data.
6. Start the backend server: `npm start`
   *(The server will run on port 5000. You can verify it at `http://localhost:5000/api/health`)*

## 3. Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env.local` file using `.env.example` as a template and add your Firebase keys and `VITE_API_URL`.
4. Start the React application: `npm run dev`

## 4. Admin Access (Demo for Audit)
To test admin functionalities, use the following credentials on the login page:
- **Email:** demo@example.com
- **Password:** DemoPass123!

**Note regarding database:** This project strictly uses MongoDB as the real stack. Any `schema.sql` or `seed.sql` files found in the database folder are unused placeholders/legacy files and should be ignored.