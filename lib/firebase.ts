import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABzo0dTO_w8-1rvEawiwviB798Nwvdojk",
  authDomain: "shopaxa-api.firebaseapp.com",
  projectId: "shopaxa-api",
  storageBucket: "shopaxa-api.firebasestorage.app",
  messagingSenderId: "583802886419",
  appId: "1:583802886419:web:d6af454dc0d8671fa462e6",
  measurementId: "G-0P2DXMS0CB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Initialize analytics only on client side
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, auth, provider, signInWithPopup, signOut, signInWithEmailAndPassword };
