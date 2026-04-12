// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if config has placeholder values
const hasPlaceholderValues =
    firebaseConfig.apiKey === 'your_api_key_here' ||
    firebaseConfig.projectId === 'your_project_id_here';

// Initialize Firebase
let app;
let auth;
let db;

if (hasPlaceholderValues || !firebaseConfig.apiKey) {
    console.warn('%c[Firebase]', 'color: #ffa500; font-weight: bold;',
        'Firebase not configured. Authentication and cart sync will be disabled.');
    auth = null;
    db = null;
} else {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } catch (error) {
        console.error('Firebase initialization failed:', error.message);
        auth = null;
        db = null;
    }
}

export { auth, db };
export default app;