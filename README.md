# Swad Grill
A full-stack restaurant web application.

## Features
- User authentication with Firebase
- Admin dashboard for role management
- Product and order management
- Stripe payment integration

## Demo Credentials
- Admin Email: demo@example.com
- Password: DemoPass123!

## License
See [LICENSE-NOTE.md](./LICENSE-NOTE.md) for details.

---

## Setup Instructions

### 1. Prerequisites
- Node.js (v20.10.0 or higher) installed.
- MongoDB Atlas cluster ready.
- Firebase account configured for authentication keys.
- Stripe account configured for payment keys.

### 2. Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file using `.env.example` as a template and configure your `MONGODB_URI` and other keys.
4. **MongoDB Setup & Indexing:** Run the following command to automatically create the necessary database indexes:
   ```bash
   npm run db:setup