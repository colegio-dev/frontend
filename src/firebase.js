
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA3afz-yIQD1kWIrEQIAmFejfpl-3QjaQ0",
  authDomain: "facturador-colegio.firebaseapp.com",
  projectId: "facturador-colegio",
  storageBucket: "facturador-colegio.appspot.com",
  messagingSenderId: "968282073487",
  appId: "1:968282073487:web:d80d45e112db0a615543fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const Auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(); // Proveedor de autenticación de Google

