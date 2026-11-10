# How To Setup Swad Grill

## 1. Prerequisites
- Node.js v20.10.0 or higher
- A MongoDB Atlas cluster (free tier is fine)
- A Firebase project with Email/Password authentication enabled
- A Stripe account (test mode keys)

## 2. Get the code
```bash
unzip swad-grill.zip
cd swad-grill
```

## 3. Backend
```bash
cd backend
npm install
```

Create the environment file:
```bash
cp .env.example .env
```
Windows PowerShell: `copy .env.example .env`

Open `.env` and fill in every variable listed in `.env.example` (MongoDB connection string, Firebase and Stripe keys, port).

Prepare the database:
```bash
npm run db:setup    # creates collections and indexes
npm run seed        # inserts demo products, settings and the demo admin user
```

Start the server:
```bash
npm start
```
The API runs on the port set in `.env`.

## 4. Frontend
Open a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
```
Set `VITE_API_URL` in `frontend/.env` to the backend address (for example `http://localhost:5000`), and fill in the Firebase web config variables.

```bash
npm run dev
```
Open http://localhost:5173

## 5. Demo login
1. In Firebase Console, go to Authentication and add a user: `demo@example.com` with password `Demo@Swad2026`.
2. The seed script already creates the matching admin record in MongoDB.
3. Log in on the site with those credentials.

## 6. Production build
```bash
cd frontend
npm run build
```
Deploy `frontend` to Vercel (set `VITE_API_URL`) and the backend to Render or Railway (set all backend env variables).

## 7. Troubleshooting
- Blank page or network errors: check `VITE_API_URL` and that the backend is running.
- Cannot connect to MongoDB: add your IP in Atlas Network Access and check `MONGODB_URI`.
- Login works but no admin access: run `npm run seed` again and make sure the Firebase email matches the seeded admin email.

## 8. What is NOT included in the ZIP
`node_modules`, `dist`, and `.env` files are excluded. Run `npm install` to recreate dependencies.