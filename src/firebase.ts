// Firebase config and Firestore export for Sentinel waitlist
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByrttnmo9hW-PmsfMsCxjCAzaAIGI6Tek",
  authDomain: "sentinel-landing.firebaseapp.com",
  projectId: "sentinel-landing",
  storageBucket: "sentinel-landing.firebasestorage.app",
  messagingSenderId: "1031376783795",
  appId: "1:1031376783795:web:3f1b5a5c56f7e293e863c6",
  measurementId: "G-159B4BZK4G"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app); 