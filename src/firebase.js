import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCHb7Y4o46h3LFPbe_s_VKGQvOcEpW8iDw",
  authDomain: "dynamic-illuminations-26410.firebaseapp.com",
  projectId: "dynamic-illuminations-26410",
  storageBucket: "dynamic-illuminations-26410.firebasestorage.app",
  messagingSenderId: "56005244969",
  appId: "1:56005244969:web:afff34b05ba4fb12ac0438"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);