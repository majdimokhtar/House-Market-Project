import {getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDRNbvNcp_5XmUUuHd_DDtUE99mq_D0lE",
  authDomain: "house-marketplace-app-583a5.firebaseapp.com",
  projectId: "house-marketplace-app-583a5",
  storageBucket: "house-marketplace-app-583a5.appspot.com",
  messagingSenderId: "218672424908",
  appId: "1:218672424908:web:07610684de4321b4405f69"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore ()