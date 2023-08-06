// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9igaRoReRWQ3bKgVw0OQujrxp-Nw8OFk",
  authDomain: "myproject-cb9de.firebaseapp.com",
  databaseURL: "https://myproject-cb9de-default-rtdb.firebaseio.com",
  projectId: "myproject-cb9de",
  storageBucket: "myproject-cb9de.appspot.com",
  messagingSenderId: "962828779200",
  appId: "1:962828779200:web:f09385763b6c227b643725"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize Database

export const db=getDatabase(app);

export const auth = getAuth(app);
