
import { initializeApp } from 'firebase/app';
import {  getStorage } from 'firebase/storage';

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



export const storage = getStorage(app)



