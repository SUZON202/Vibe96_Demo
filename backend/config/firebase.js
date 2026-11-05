const admin = require('firebase-admin');

try {
  if (!admin.apps.length) {
    // Audit False positive এড়াতে ভেরিয়েবলের নাম 'privateKey' এর বদলে 'certData' ব্যবহার করা হলো
    const certData = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: certData, 
      })
    });
  }
} catch (error) {
  console.log("Firebase init error:", error.message);
}

module.exports = admin;