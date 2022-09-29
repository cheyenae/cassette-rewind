import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const API_KEY = process.env.REACT_APP_API_KEY
const API_DOMIAN = process.env.REACT_APP_AUTH_DOMAIN
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: API_DOMIAN,
    projectId: "cassetterewind-957c1",
    storageBucket: "cassetterewind-957c1.appspot.com",
    messagingSenderId: "2005970907",
    appId: "1:2005970907:web:0713a34d5b97d87fd1c1fe",
    measurementId: "G-8V2FY0GRXT"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };