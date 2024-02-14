// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgBj62k4iK8P3mCodudQxk6fdRNI0dZSo",
  authDomain: "react-project-4ad62.firebaseapp.com",
  projectId: "react-project-4ad62",
  storageBucket: "react-project-4ad62.appspot.com",
  messagingSenderId: "831972912718",
  appId: "1:831972912718:web:2bcf688526b54d01061d1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider;
export const db = getFirestore(app);