// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD-4SVqHIbitw3n0buI8plpTU-hx-GmWl0',
  authDomain: 'todo-9b57d.firebaseapp.com',
  projectId: 'todo-9b57d',
  storageBucket: 'todo-9b57d.appspot.com',
  messagingSenderId: '941880437526',
  appId: '1:941880437526:web:d033ecb610d9902f057e37',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
