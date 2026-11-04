# Project Architecture

## Overview
This project is a full-stack web application built using a decoupled client-server architecture. The frontend and backend operate independently and communicate via RESTful APIs.

## Technology Stack
* **Frontend:** React.js (Vite), Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Firebase Authentication

## Folder Structure
* `/frontend`: Contains the React client application, components, pages, and UI logic.
* `/backend`: Contains the Express server, API routes, controllers, and database models.

## Data Flow
1. **Client Request:** The React frontend sends HTTP requests (GET, POST, PUT, DELETE) to the backend API.
2. **Authentication:** Firebase handles user authentication, ensuring secure login and session management.
3. **Server Processing:** The Node/Express server receives the request, validates data, and applies business logic.
4. **Database Interaction:** The server queries or updates the MongoDB database.
5. **Response:** The backend returns a JSON response to the client, which updates the UI accordingly.