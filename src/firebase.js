import firebase from "firebase";
import 'firebase/auth'

export const auth = firebase.initializeApp ({
    apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
    authDomain: "convo-chat-app-e8889.firebaseapp.com",
    projectId: "convo-chat-app-e8889",
    storageBucket: "convo-chat-app-e8889.appspot.com",
    messagingSenderId: "504181463681",
    appId: "1:504181463681:web:eb14bb758f4d38f953cb80"
}).auth()