// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRJ30o3rZ21X9B3sESmSh84jq9NSNLI3Q",
    authDomain: "perfumes-a82a8.firebaseapp.com",
    projectId: "perfumes-a82a8",
    storageBucket: "perfumes-a82a8.firebasestorage.app",
    messagingSenderId: "751727448124",
    appId: "1:751727448124:web:453056da04db02205fb339",
    measurementId: "G-M75NZTN5N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;