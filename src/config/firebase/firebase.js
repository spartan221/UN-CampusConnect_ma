// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDAcEST0hw1dsutNCzh7KcDd8k1X4svs3U',
  authDomain: 'un-campusconnect.firebaseapp.com',
  projectId: 'un-campusconnect',
  storageBucket: 'un-campusconnect.appspot.com',
  messagingSenderId: '328995315279',
  appId: '1:328995315279:web:7cb852580a6f44acd2143a',
  measurementId: 'G-419GRG1WL2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
