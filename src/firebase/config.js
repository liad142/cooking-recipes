import firebase from "firebase/app";
import  "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsREInRUn0P7LwnzA9yraKaSz6zS9aPG4",
    authDomain: "cooking-ninja-cb54f.firebaseapp.com",
    projectId: "cooking-ninja-cb54f",
    storageBucket: "cooking-ninja-cb54f.appspot.com",
    messagingSenderId: "283775240417",
    appId: "1:283775240417:web:a71c9b491e5029ae7e8fa0"
};


//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()

export {projectFirestore}
