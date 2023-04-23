import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5_VolxA5X4YCjheSw_rR_h_d6noYB-lo",
  authDomain: "todo-3d2a2.firebaseapp.com",
  projectId: "todo-3d2a2",
  storageBucket: "todo-3d2a2.appspot.com",
  messagingSenderId: "766344619163",
  appId: "1:766344619163:web:fca1a34b41dbf397d6923e"
};

// Initialize Firebase
//const app = 
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();
export default db;