// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "knotai-b0549.firebaseapp.com",
  projectId: "knotai-b0549",
  storageBucket: "knotai-b0549.firebasestorage.app",
  messagingSenderId: "158793859360",
  appId: "1:158793859360:web:a1e4f2bb606eb6c55d5745"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();