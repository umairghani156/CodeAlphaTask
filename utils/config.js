// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore,setDoc, collection, addDoc, getDoc,getDocs, doc, serverTimestamp, query, orderBy, deleteDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDnjNRjq583w2mqTLEPEgItZkUrHVN7SBA",
    authDomain: "first-frontend-project-da025.firebaseapp.com",
    projectId: "first-frontend-project-da025",
    storageBucket: "first-frontend-project-da025.appspot.com",
    messagingSenderId: "796702314001",
    appId: "1:796702314001:web:d4a8041c80b87c69b36bb0",
    measurementId: "G-JJGJY0FBXM"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);
  export {app, auth, db, collection, addDoc, getDoc, getDocs, doc, serverTimestamp, query, orderBy,setDoc, deleteDoc}