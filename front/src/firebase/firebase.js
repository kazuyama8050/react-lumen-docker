import firebase from "firebase/app";
import "firebase/storage";
var firebaseConfig = {
    apiKey: "AIzaSyCqCqx6sIKcdgMzV9HCdCCCR6VqFy5Wb70",
    authDomain: "react-lumen.firebaseapp.com",
    projectId: "react-lumen",
    storageBucket: "react-lumen.appspot.com",
    messagingSenderId: "584113620260",
    appId: "1:584113620260:web:1e9a4571e68ab149d1dfb1",
    measurementId: "G-7CXQSPWZWV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;