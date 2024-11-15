// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClLNjGTOEgiNNusxh4HfvVcsLaf5Q_g2c",
  authDomain: "dynamic-illuminations.firebaseapp.com",
  projectId: "dynamic-illuminations",
  storageBucket: "dynamic-illuminations.firebasestorage.app",
  messagingSenderId: "552382400934",
  appId: "1:552382400934:web:2bb060abb95de2259f2767"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);