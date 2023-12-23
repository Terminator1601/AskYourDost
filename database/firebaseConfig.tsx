import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDKIQBXfp3v-RoMU-FBtFIoeR6x0FJ4Lew",
  authDomain: "askyourdost-db6cd.firebaseapp.com",
  databaseURL: "https://askyourdost-db6cd-default-rtdb.firebaseio.com",
  projectId: "askyourdost-db6cd",
  storageBucket: "askyourdost-db6cd.appspot.com",
  messagingSenderId: "572079202185",
  appId: "1:572079202185:web:761db779fa6edeffca4b58",
  measurementId: "G-5WQMPQL0WV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
