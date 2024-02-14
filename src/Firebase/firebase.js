// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEazIe6MoCRzDhUT_knukeESLAz0ah0Ic",
  authDomain: "fullwasah.firebaseapp.com",
  databaseURL: "https://fullwasah.firebaseio.com",
  projectId: "fullwasah",
  storageBucket: "fullwasah.appspot.com",
  messagingSenderId: "588056601589",
  appId: "1:588056601589:web:85b9cf37462365d49276bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const textDB = getFirestore(app)
export {storage, textDB}