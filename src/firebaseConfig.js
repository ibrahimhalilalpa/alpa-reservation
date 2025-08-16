// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_I9oO4F9d9JPVLk8Hhv-sl6v9bkBFj7I",
    authDomain: "alpa-reservation.firebaseapp.com",
    projectId: "alpa-reservation",
    storageBucket: "alpa-reservation.firebasestorage.app",
    messagingSenderId: "204099467347",
    appId: "1:204099467347:web:af4e27ce572c82322aeea6",
    measurementId: "G-9C05NPDS4Y",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);  // BURAYI EKLEDİK

