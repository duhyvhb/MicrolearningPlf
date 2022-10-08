// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBttVPs11xLyJ4lxN9EES7JJz21NgQguQ8",
  authDomain: "microplf-7c141.firebaseapp.com",
  projectId: "microplf-7c141",
  storageBucket: "microplf-7c141.appspot.com",
  messagingSenderId: "1062131539260",
  appId: "1:1062131539260:web:57c161edd85fa0800b9239",
  measurementId: "G-78R6MEHQ86"
};

// Initialize Firebase

export const fapp = initializeApp(firebaseConfig);
export const db = getFirestore(fapp);
