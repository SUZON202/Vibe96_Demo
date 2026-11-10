# Swad Grill
A full-stack restaurant web application.

## Features
- User authentication with Firebase
- Admin dashboard for role management
- Product and order management
- Stripe payment integration (test mode)

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Atlas)
- Auth: Firebase Authentication
- Payments: Stripe

## Demo Credentials
This is a throwaway demo account created only for evaluation. It has no access to real data, and Stripe runs in test mode.

- Admin Email: demo@example.com
- Password: Demo Access: Just click the "Fill Demo Login" button on the login page.
## Live Demo
https://swad-grill.vercel.app

## Quick Start
See [HowToSetup.md](./HowToSetup.md) for the full step-by-step guide. Short version:

```bash
# Backend
cd backend
npm install
cp .env.example .env      # then fill in your values
npm run db:setup          # creates collections and indexes
npm run seed              # inserts demo data
npm start

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL to the backend URL
npm run dev
```

## Database
This project uses MongoDB, not SQL. `backend/database/setup.js` creates collections and indexes, and `backend/database/seed.js` inserts demo data. The `.sql` files are kept only as a reference of the data model. See [DATABASE.md](./DATABASE.md).

## License
See [LICENSE-NOTE.md](./LICENSE-NOTE.md) for details.