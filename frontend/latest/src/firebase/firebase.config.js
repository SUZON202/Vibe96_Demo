import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZuJ3V6B4W-Qkn1PiCjY2YC8kD2IubUj8",
  authDomain: "swad-grill.firebaseapp.com",
  projectId: "swad-grill",
  storageBucket: "swad-grill.firebasestorage.app",
  messagingSenderId: "317756786628",
  appId: "1:317756786628:web:64f29488bab02e96f64691"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and export it
export const auth = getAuth(app);