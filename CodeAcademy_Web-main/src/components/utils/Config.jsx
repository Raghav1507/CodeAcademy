import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJARmYRUNIPkXYwUQg3_wFZBZzOpHZKp4",
  authDomain: "codeacademy-6c302.firebaseapp.com",
  projectId: "codeacademy-6c302",
  storageBucket: "codeacademy-6c302.firebasestorage.app",
  messagingSenderId: "589322666418",
  appId: "1:589322666418:web:ca166e2e3b7188cf6764ab",
  measurementId: "G-HVNVZ991YX",
  databaseURL: 'https://codeacademy-6c302-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;