
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAzmCbsaj4r-houjtt7aEXsAqPb2iYLn98",

  authDomain: "colegio-1be4f.firebaseapp.com",

  projectId: "colegio-1be4f",

  storageBucket: "colegio-1be4f.firebasestorage.app",

  messagingSenderId: "379186352140",
  
  appId: "1:379186352140:web:2b5cb38764fcd1ba265e29"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const Auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(); // Proveedor de autenticación de Google

