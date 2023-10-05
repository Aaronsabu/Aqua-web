import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBhphwuOZwWzmdMoWtab1MoXWYm_Io2f3I",
  authDomain: "almondo-ce9e8.firebaseapp.com",
  databaseURL: "https://almondo-ce9e8-default-rtdb.firebaseio.com",
  projectId: "almondo-ce9e8",
  storageBucket: "almondo-ce9e8.appspot.com",
  messagingSenderId: "999861200859",
  appId: "1:999861200859:web:cd8732ed0dfb21326069fe",
  measurementId: "G-R3CVVE252T"
};

if(firebase.apps.length === 0 ) {
    firebase.initializeApp(firebaseConfig);    
}

const db = getDatabase();
export { db };
