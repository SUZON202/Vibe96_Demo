const admin = require("firebase-admin");
const { initializeApp, cert, getApps } = require("firebase-admin/app");
require("dotenv").config();

try {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    
    // .env ফাইল থেকে Key নেওয়ার সময় কোনো সমস্যা থাকলে সেটা ফিক্স করবে
    if (privateKey) {
        privateKey = privateKey.replace(/\\n/g, '\n').replace(/^"|"$/g, '');
    }

    // অ্যাপ আগে থেকে ইনিশিয়ালাইজ করা না থাকলে নতুন করে করবে
    if (!getApps().length) {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey
            })
        });
    }
    
    console.log("Firebase Admin initialized successfully.");
} catch (error) {
    console.error("Firebase Initialization Error:", error.message);
}

module.exports = admin;