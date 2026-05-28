import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqBuvDUYPZR3AiPD1gB6mwk2HckE8_Fm0",
  authDomain: "hoodie-c311e.firebaseapp.com",
  projectId: "hoodie-c311e",
  storageBucket: "hoodie-c311e.firebasestorage.app",
  messagingSenderId: "366641532097",
  appId: "1:366641532097:web:0b4c58a0eb0bc53e99d840",
  measurementId: "G-WDMMHY6QKQ"
};

const app = initializeApp(firebaseConfig);

// ✅ THESE ARE REQUIRED EXPORTS
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();