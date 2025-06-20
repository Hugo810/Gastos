// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "<sua chave>",
    authDomain: "<seu dominio>",
    projectId: "<seu projeto>",
    storageBucket: "<seu bucket>",
    messagingSenderId: "<seu message>",
    appId: "<seu app id>",
    measurementId: "<sua medida>"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const db = getFirestore(app);

export { firebaseConfig  };