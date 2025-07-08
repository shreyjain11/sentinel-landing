// Firebase config and Firestore export for Sentinal waitlist
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByrttnmo9hW-PmsfMsCxjCAzaAIGI6Tek",
  authDomain: "sentinal-landing.firebaseapp.com",
  projectId: "sentinal-landing",
  storageBucket: "sentinal-landing.firebasestorage.app",
  messagingSenderId: "1031376783795",
  appId: "1:1031376783795:web:3f1b5a5c56f7e293e863c6",
  measurementId: "G-159B4BZK4G"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app); 