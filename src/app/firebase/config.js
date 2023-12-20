// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA70yOwR6VX9zU1xOwJqrXotgqAPPJe94g",
    authDomain: "alphabi-giphy-assignment.firebaseapp.com",
    projectId: "alphabi-giphy-assignment",
    storageBucket: "alphabi-giphy-assignment.appspot.com",
    messagingSenderId: "534257140006",
    appId: "1:534257140006:web:32a17ab687deb145a241e7",
    measurementId: "G-Q24RLC5BLF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app)

export { app, auth };