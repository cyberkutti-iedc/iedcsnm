import firebase from "firebase/compat/app"; // Import Firebase
import "firebase/compat/database"; // Import Firebase Realtime Database
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage'; // Import Firebase Storage




const firebaseConfig = {
    apiKey: "AIzaSyDbnGK4ZpLge2Q0-bTwVr-0x5Ut6TTC-lI",
    authDomain: "contactform-553c5.firebaseapp.com",
    databaseURL: "https://contactform-553c5-default-rtdb.firebaseio.com",
    projectId: "contactform-553c5",
    storageBucket: "contactform-553c5.appspot.com",
    messagingSenderId: "976023470894",
    appId: "1:976023470894:web:2ce6c7e1560adb06dd70bf",
    measurementId: "G-VD88MS0J9D"
};

// Initialize Firebase with your configuration
const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();






const firestore = firebase.firestore();




export const auth = app.auth();
export const db = firebaseApp.database();
export { firestore, storage };
