import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY, 
  authDomain: "reactchat-37fc2.firebaseapp.com",
  projectId: "reactchat-37fc2",
  storageBucket: "reactchat-37fc2.firebasestorage.app",
  messagingSenderId: "957513289804",
  appId: "1:957513289804:web:dac9f21c6402e55ecc64e9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);